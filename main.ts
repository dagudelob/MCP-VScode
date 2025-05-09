
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";//zod es una libreria para validar los tipos de datos

//create server 
const server = new McpServer({
    name: "Demo",
    version: "1.0.0",
    //port: 3000,
    //host: "localhost",
})

//2. Definir las herramientas que el LLM puede usar 
//las herramientas permiten al LLM realizar acciones a través del API de la herramienta

server.tool(
    'fetch-weather', // titulo de la herramienta
    'Tool to fetch weather information for a given city', // descripcion de la herramienta
    {
        city: z.string().describe("City name"), // parametro de entrada de la herramienta, zod es una libreria para validar los tipos de datos
    },
    async({city}) => { // esto es lo que tenemos que hacer en la herramienta
        // aqui va la logica de la herramienta
        // en este caso, simulamos la respuesta de la API del clima
        // en un caso real, hariamos una llamada a la API del clima
        const weather = {
            city: city,
            temperature: 25,
            condition: "sunny"
        }
        return {content: [{type: "json", json: weather}]}
    }
)

//3. escuchar las conexiones del cliente
const transport =  new StdioServerTransport()
await server.connect(transport)
