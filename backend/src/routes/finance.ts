import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/finance/stats
// Returns aggregated total revenue, total pending, and member counts
router.get('/stats', async (req, res) => {
  try {
    const gymId = req.query.gymId as string;
    
    if (!gymId) {
      return res.status(400).json({ error: 'gymId is required' });
    }

    // Get all payments for this gym's members
    const payments = await prisma.payment.findMany({
      where: {
        membership: {
          plan: {
            branch: {
              gymId: gymId
            }
          }
        }
      }
    });

    const totalRevenue = payments
      .filter(p => p.status === 'PAID')
      .reduce((sum, p) => sum + p.amount, 0);
      
    const totalPending = payments
      .filter(p => p.status === 'PENDING')
      .reduce((sum, p) => sum + p.amount, 0);

    const paidMembersCount = new Set(payments.filter(p => p.status === 'PAID').map(p => p.userId)).size;
    const pendingMembersCount = new Set(payments.filter(p => p.status === 'PENDING').map(p => p.userId)).size;

    return res.json({
      totalRevenue,
      totalPending,
      paidMembersCount,
      pendingMembersCount
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch finance stats' });
  }
});

// GET /api/finance/payments
// Returns a detailed list of payments with user info
router.get('/payments', async (req, res) => {
  try {
    const gymId = req.query.gymId as string;
    
    if (!gymId) {
      return res.status(400).json({ error: 'gymId is required' });
    }

    const payments = await prisma.payment.findMany({
      where: {
        membership: {
          plan: {
            branch: {
              gymId: gymId
            }
          }
        }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        membership: {
          include: {
            plan: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(payments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

export default router;
