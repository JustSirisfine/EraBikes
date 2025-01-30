import axios from "axios";
import * as helper from "../services/serviceHelpers";

const forumService = {
    endpoint: `${helper.API_HOST_PREFIX}/api/forum`
};

forumService.addForumPost = (payload) => {
    conole.log("Forum Data:", payload);
    const config = {
        method: "POST",
        data: payload,
        url: `${forumService.endpoint}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

forumService.getById = (id) => {
    conole.log("Get All Forum Data");
    const config = {
        method: "GET",
        url: `${forumService.endpoint}/${id}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config);
}

forumService.getByCategoryId = (categoryId,pageIndex,pageSize) => {
    console.log("Get All Forum Data");
    const config = {
        method: "GET",
        url: `${forumService.endpoint}/paginate/bycategory?forumcategoryid=${categoryId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config);
}

forumService.search = (query,pageIndex,pageSize) => {
    console.log("Get All Forum Data");
    const config = {
        method: "GET",
        url: `${forumService.endpoint}/search/paginate?query=${query}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config);
}

forumService.getByAnswerId = (answerId) => {
    console.log("Get All Forum Data");
    const config = {
        method: "GET",
        url: `${forumService.endpoint}/forumanswers/${answerId}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    }
    return axios(config);
}

forumService.addForumAnswer = (payload) => {
    console.log("Forum Answer:", payload);
    const config = {
        method: "POST",
        data: payload,
        url: `${forumService.endpoint}/forumanswers`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export default forumService;
