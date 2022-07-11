import { getRealseeSpaceProps, RealseeSpace } from "@/lib";
import { RealseeSpaceProps } from "@/lib/core/typings/RealseeSpaceProps";
import logger from "@/lib/core/utils/logger";
import { parseQuery } from "@/lib/core/utils/qs";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

const ExampleApp = dynamic(() => import("@/apps/example"), { ssr: false });

const useRealseeSpaceProps = () => {
  const [realseeSpaceProps, setRealseeSpaceProps] = useState<
    RealseeSpaceProps | undefined
  >();

  const initRealseeSpaceProps = useCallback(async () => {
    const { props } = await getRealseeSpaceProps({
      getConfig: (defaultConfig, originConfig) => {
        logger.info("默认配置：", defaultConfig);
        logger.info("远程配置：", originConfig);
        const config = { ...defaultConfig, ...originConfig };
        const query = parseQuery(globalThis.location.search);
        const queryConfig = Object.keys(query)
          .filter(
            (key) =>
              typeof query[key] === "string" &&
              ["0", "1", "true", "false"].includes(query[key] as string)
          )
          .map((key) => ({
            [key]: query[key] === "1" || query[key] === "true",
          }))
          .reduce((a, b) => ({ ...a, ...b }), {});
        logger.info("参数配置：", queryConfig);
        return { ...config, ...queryConfig };
      },
    });
    setRealseeSpaceProps(props);
  }, []);

  useEffect(() => {
    initRealseeSpaceProps();
  }, [initRealseeSpaceProps]);

  return realseeSpaceProps;
};

const Space = () => {
  const realseeSpaceProps = useRealseeSpaceProps();
  return (
    <>
      <Head>
        <title>如视</title>
        <meta charSet="UTF-8" />
        <link href="/favicon.ico" type="image/x-icon" rel="icon" />
        {/* viewport 必须设置好  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
      {realseeSpaceProps && (
        <RealseeSpace {...realseeSpaceProps}>
          <ExampleApp realseeSpaceProps={realseeSpaceProps}></ExampleApp>
        </RealseeSpace>
      )}
    </>
  );
};

export default Space;
