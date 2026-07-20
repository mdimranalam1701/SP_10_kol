import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// PUT /api/memberships/upgrade
// Customer changes their active plan
router.put('/upgrade', async (req, res) => {
  try {
    const { membershipId, newPlanId } = req.body;
    
    if (!membershipId || !newPlanId) {
      return res.status(400).json({ error: 'membershipId and newPlanId are required' });
    }

    const updatedMembership = await prisma.membership.update({
      where: { id: membershipId },
      data: {
        planId: newPlanId
      },
      include: {
        plan: true
      }
    });

    return res.json(updatedMembership);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to upgrade membership plan' });
  }
});

export default router;
