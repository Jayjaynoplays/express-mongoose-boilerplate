// import { BEARER_AUTH_CONFIG } from '../constants';

import { ISwaggerCore } from "../api/swaggerCore";
import { BEARER_AUTH_CONFIG } from "../constants";
import { SwaggerContent } from "../model/SwaggerContentDto";

// export class SwaggerBuilder {
//     instance = {};

//     static builder() {
//         return new SwaggerBuilder();
//     }

//     #toResponseSuccess = model => ({
//         200: {
//             description: 'successful operation',
//             content: model ? {
//                 'application/json': {
//                     schema: {
//                         type: 'array',
//                         items: {
//                             $ref: `#/components/schemas/${model}`,
//                         },
//                     },
//                 },
//             } : '',
//         },
//     })

//     #toErrors = errors => {
//         const responses = {};

//         errors.forEach(error => {
//             if (!error.status || !error.description) {
//                 throw new Error('Error in swagger must contain status and description');
//             }
//             responses[error.status] = {
//                 description: error.description
//             };
//         });
//         return responses;
//     }

//     addConfig(options) {
//         const {
//             openapi,
//             info,
//             servers,
//             auth,
//             basePath,
//         } = options;

//         this.instance.openapi = openapi;
//         this.instance.info = info;
//         this.instance.servers = servers;
//         this.instance.basePath = basePath;
//         this.instance.components = {
//             schemas: {},
//         };
//         this.instance.tags = [];
//         this.instance.paths = {};
//         if (auth) {
//             this.instance.components['securitySchemes'] = {
//                 bearerAuth: BEARER_AUTH_CONFIG,
//             };
//         }
//         return this;
//     }

//     addTag(name) {
//         if (!this.instance.tags.some(tag => tag === name)) this.instance.tags.push(name);
//     }

//     /**
//      * @param {
//      {
//         route?: any,
//         method?: any,
//         tags?: any,
//         description?: any,
//         security?: any,
//         model?: string,
//         body?:any,
//         params?:any,
//         consumes?:any
//     }} options
//      */
//     api(options) {
//         const {
//             route,
//             method,
//             tags,
//             description,
//             security,
//             model,
//             body,
//             params = [],
//             consumes = [],
//             errors = []
//         } = options;
//         const responses = {};

//         if (!this.instance.paths[route]) {
//             this.instance.paths[route] = {};
//         }

//         this.instance.paths[route][method] = {
//             tags: tags.length ? tags : [tags],
//             description,
//             security: security ? [
//                 {
//                     bearerAuth: [],
//                 },
//             ] : [],
//             produces: [
//                 'application/json',
//             ],
//             consumes,
//             parameters: params,
//             requestBody: body ? {
//                 content: {
//                     'application/json': {
//                         schema: {
//                             $ref: `#/components/schemas/${body}`,
//                         },
//                     },
//                 },
//                 required: true,
//             } : {},
//             responses: {
//                 ...responses,
//                 ...this.#toResponseSuccess(model),
//                 ...this.#toErrors(errors)
//             },
//         };
//     }

//     addModel(name, properties, isArray) {
//         if (isArray) {
//             this.instance.components.schemas[name] = {
//                 type: 'array',
//                 items: {
//                     type: 'object',
//                     properties,
//                 }
//             };
//         } else {
//             this.instance.components.schemas[name] = {
//                 type: 'object',
//                 properties,
//             };
//         }
//     }
// }
export interface SwaggerBody {
    content: any,
    required?: boolean;
    description?: string;
}

export interface PathSchema {
    [key: string]: any;
}

export interface SwaggerInfo {
    version?: string;
    title?: string;
    description?: string;
    termsOfService?: string;
    contact?: {
        name: string;
        email: string;
    }
}

export interface ServerConfig {
    url: string;
    description: string;
    variables: {
        env: {
            default: string;
            description: string;
        },
        port: {
            enum: Object,
            default: string
        },
        basePath: {
            default: string
        },
    },
}

export interface SwaggerConfig {
    openapi: string;
    info: SwaggerInfo;
    servers: Array<ServerConfig>;
    auth: boolean;
    basePath: string;
}

export interface SwaggerSetup extends SwaggerConfig {
    components: {
        schemas: Record<string, any>
    };
    tags: Array<string>
    paths: Record<string, PathSchema>
}

export class SwaggerCore implements ISwaggerCore {
    private static KEY_SECURITY = 'securitySchemes';

    private setup: SwaggerSetup;
    private buildFlag = false;

    constructor(config: SwaggerConfig) {
        this.setup = {
            ...config,
            components: {
                schemas: {
                    // Curently this lib only support for Bearer auth
                    [SwaggerCore.KEY_SECURITY]: {
                        bearerAuth: BEARER_AUTH_CONFIG,
                    }
                }
            },
            tags: [],
            paths: {}
        };
    }

    private throwIfNotBuildFirst() {
        if (!this.buildFlag) {
            throw new Error(`Class ${SwaggerCore.name} need to called build() first then call to others actions`);
        }
    }
 
    public addTag(tag: string): void {
        this.throwIfNotBuildFirst();
        if (this.setup.tags.some(tag => tag === tag)) this.setup.tags.push(tag);
        return;
    }

    public addApi(document: SwaggerContent): void {
        this.throwIfNotBuildFirst();
        if (!this.setup.paths[document.route]) {
            this.setup.paths[document.route] = {};
        }

        const tags = typeof document.tags === 'string' ? [document.tags]
                    : Array.isArray(document.tags) ?
                    document.tags
                    : [];

        const parameters = Array.isArray(document.params) ? document.params : [];
        
        // TODO: After build function support swagger body will verify here
        // if (body is not SwaggerBody) throw error

        this.setup.paths[document.route][document.method] = {
            tags,
            description: document.description,
            security: document.security ? [
                {
                    bearerAuth: [],
                },
            ] : [],
            produces: [
                'application/json',
            ],
            consumes: document.consumes,
            parameters,
            requestBody: document.body,
            responses: document.responses,
        };
    }

    public build() {
        this.buildFlag = true;
        return this;
    }
}
