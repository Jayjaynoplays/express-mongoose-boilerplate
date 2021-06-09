import { SwaggerContent } from "../model/SwaggerContentDto";

export interface ISwaggerCore {
    addTag(tag: string): void;
    addApi(document: SwaggerContent): void;
}