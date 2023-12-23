import { Router, Request, Response } from "express";
import HeroModel, { IHero } from "../models/Hero";

const router = Router();

// GET /heroes
router.get("/", async (req: Request, res: Response) => {
  try {
    const heroes: IHero[] = await HeroModel.find();

    if (heroes.length === 0) {
      res.status(404).json({ message: "คอลเลกชันไม่มีข้อมูล หรือ ชื่อไม่ถูกต้อง เช่น event เป็น events" });
    } else {
      res.json(heroes);
      console.log("Fetched heroes:", heroes);
    }

  } catch (error: any) {
    console.error("Error fetching heroes:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /heroes/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const hero: IHero | null = await HeroModel.findById(id);

    if (hero) {
      res.json(hero);
    } else {
      res.status(404).json({ message: "Hero not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
