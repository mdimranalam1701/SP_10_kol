import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();

// GET all customers with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: 'MEMBER' },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          memberships: {
            include: { plan: true }
          },
          payments: true
        }
      }),
      prisma.user.count({ where: { role: 'MEMBER' } })
    ]);

    res.json({
      customers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching customers' });
  }
});

// POST add a new customer (with plan and payment)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password, planId, paymentStatus } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Run within a transaction so everything succeeds or fails together
    const newCustomer = await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          role: 'MEMBER',
        }
      });

      // 2. If planId exists, create Membership and Payment
      if (planId) {
        const plan = await tx.plan.findUnique({ where: { id: planId } });
        if (plan) {
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + plan.durationDays);

          const membership = await tx.membership.create({
            data: {
              userId: user.id,
              planId: plan.id,
              endDate: endDate,
            }
          });

          if (paymentStatus) {
            await tx.payment.create({
              data: {
                amount: plan.price,
                status: paymentStatus,
                membershipId: membership.id,
                userId: user.id
              }
            });
          }
        }
      }

      return user;
    });

    res.status(201).json(newCustomer);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Error creating customer' });
  }
});

// PUT update a customer
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, password } = req.body;

    const updateData: any = { firstName, lastName, email, phone };

    // Only hash and update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedCustomer = await prisma.user.update({
      where: { id },
      data: updateData
    });

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating customer' });
  }
});

// DELETE a customer
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Prisma relation cascades must be configured in schema, otherwise manual deletion is needed.
    // Assuming manual deletion is safer here:
    await prisma.$transaction(async (tx) => {
      await tx.payment.deleteMany({ where: { userId: id } });
      await tx.membership.deleteMany({ where: { userId: id } });
      await tx.user.delete({ where: { id } });
    });

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting customer' });
  }
});

export default router;
