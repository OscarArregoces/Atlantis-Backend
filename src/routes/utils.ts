import { Router } from "express";
import { validTokenSesion } from "../middelware/session";
import { dashboardGraphic, dashboardGraphicTranslate, dashboardItems, dashboardRankingProducts, economyController } from "../controllers/utils";
import { ValidFieldsGraphicTranslate } from "../middelware/utils";

const router = Router();

router.get("/economy", validTokenSesion, economyController);
router.get("/dashboard/graphic", validTokenSesion, dashboardGraphic);
router.post("/dashboard/graphic/translate", validTokenSesion, ValidFieldsGraphicTranslate, dashboardGraphicTranslate);
router.get("/dashboard/rankingProducts", validTokenSesion, dashboardRankingProducts);
router.get("/dashboard/items", validTokenSesion, dashboardItems);

export { router };
