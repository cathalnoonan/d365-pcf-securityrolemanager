export function getEntityReference(): IEntityReference {
    const params = getQueryStringParams();

    return {
        id: params.id || '',
        etn: params.etn || '',
    };
}

interface IEntityReference {
    etn: string;
    id: string;
}

function getQueryStringParams(): any {
    const qs = window.location.search
        .substring(1)                       // Remove '?'
        .split('&')
        .map(param => param.split('='));

    let result: any = {};
    qs.forEach(param => result[param[0]] = param[1]);

    return result;
}
