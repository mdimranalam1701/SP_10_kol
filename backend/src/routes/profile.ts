import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { upload } from '../config/cloudinary';

const router = Router();
const prisma = new PrismaClient();

// PUT /api/profile
// Updates user details and profile picture
router.put('/', upload.single('profilePic'), async (req, res) => {
  try {
    const { userId, firstName, lastName, email, phone, password } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (password) updateData.password = password; // Should hash in prod

    if (req.file) {
      // req.file.path contains the secure Cloudinary URL from the multer storage
      updateData.profilePic = req.file.path;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        profilePic: true,
        role: true,
      }
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
