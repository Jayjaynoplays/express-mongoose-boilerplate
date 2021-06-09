export interface SwaggerContent {
    method: string;
    route: string;
    tags: string | Array<string>;
    body?: string;
    consumes?: string;
    description?: string;
    responses?: string;
    security?: boolean;
    model?: string;
    params?: Array<string>;
}

// TODO: Update type of rawContent
export const SwaggerContentDto = (rawContent: any): SwaggerContent => ({
    description: rawContent.description,
    method: rawContent.method.toLowerCase(),
    route: rawContent.route,
    security: rawContent.preAuthorization,
    tags: rawContent.tag,
    model: rawContent.model,
    body: rawContent.body,
    params: rawContent.params,
    consumes: rawContent.consumes,
    responses: rawContent.responses
});
