import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// PUT /api/plans/:id
// Admin updates plan details (price, description)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price, description, name } = req.body;

    const updateData: any = {};
    if (price !== undefined) updateData.price = parseFloat(price);
    if (description !== undefined) updateData.description = description;
    if (name !== undefined) updateData.name = name;

    const updatedPlan = await prisma.plan.update({
      where: { id },
      data: updateData,
    });

    return res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update plan' });
  }
});

export default router;
