import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST') {
        const token = '4ec09dd4ed7d1fe7f300a34a799d3a';
        const client = new SiteClient(token);
        const registroCriado = await client.items.create({
            itemType: '968435',
            ...request.body,
        });
        response.json({
            registroCriado: registroCriado,
        });
    }
    else {
        response.status(404);
    }
}