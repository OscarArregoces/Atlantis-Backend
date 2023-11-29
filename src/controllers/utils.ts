import { Request, Response } from "express";
import { HttpResponse } from "../utils/errors/response";
import { dashboardGraphicService, dashboardGraphicTranslateService, dashboardItemsService, dashboardRankingProductsService, economyService } from "../services/utils";

const httpResponse = new HttpResponse();

const economyController = async (req: Request, res: Response) => {
    const response = await economyService();
    return httpResponse.Ok(res, response)
}
const dashboardGraphic = async (req: Request, res: Response) => {
    const response = await dashboardGraphicService();
    return httpResponse.Ok(res, response)
}
const dashboardGraphicTranslate = async ({ body }: Request, res: Response) => {
    const { nameProducts } = body;
    const response = await dashboardGraphicTranslateService(nameProducts);
    return httpResponse.Ok(res, response)
}
const dashboardRankingProducts = async (req: Request, res: Response) => {
    const response = await dashboardRankingProductsService();
    return httpResponse.Ok(res, response)
}
const dashboardItems = async (req: Request, res: Response) => {
    const response = await dashboardItemsService();
    return httpResponse.Ok(res, response)
}

export { economyController, dashboardGraphic, dashboardGraphicTranslate, dashboardRankingProducts, dashboardItems };