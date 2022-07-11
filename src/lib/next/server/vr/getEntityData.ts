import { entityDataService } from "@/lib/core/services/vr/entityData";
import { RealseeSpaceCommonParams } from "@/lib/core/typings/RealseeSpaceCommonParams";

/**
 * 获取vr实体数据
 * @param params 统一参数
 */
export const getRealseeEntityData = async (params: RealseeSpaceCommonParams) => await entityDataService(params)
