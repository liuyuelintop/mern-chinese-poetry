import { useMutation, useQueryClient } from "react-query";
import { likePoem, likeShijing } from "../api/poem.js";
import { useLocation } from "react-router-dom";

// 根据类型选择合适的点赞函数
const getLikeFunction = (type) => {
  switch (type) {
    case "shijing":
      return likeShijing;
    default:
      return likePoem;
  }
};

// 根据当前路径获取相应的 queryKeys
const getQueryKeys = (pathname) => {
  if (pathname.includes("/tang")) {
    return ["tang-300-poems"];
  } else if (pathname.includes("/song")) {
    return ["song-300-poems"];
  } else if (pathname.includes("/shi_jing")) {
    return ["shijing"];
  } else if (pathname.includes("/search-poetry")) {
    return ["search-poetry"];
  } else if (pathname.includes("/search-shijing")) {
    return ["search-shijing"];
  }
  return ["random-poems"];
};

// 定义点赞项的 Mutation Hook
const useLikeItem = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  return useMutation(({ id, type }) => getLikeFunction(type)(id), {
    onSuccess: (data, variables) => {
      const queryKeys = getQueryKeys(location.pathname);

      // 使用 setQueryData 更新本地缓存
      queryKeys.forEach((key) => {
        queryClient.setQueryData(key, (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            poems: oldData.poems.map((poem) =>
              poem.id === variables.id
                ? { ...poem, likes: poem.likes + 1 }
                : poem
            ),
          };
        });
      });

      // 使用 invalidateQueries 在特定情况下重新 fetch 数据
      if (
        location.pathname.includes("/shi_jing") ||
        location.pathname.includes("/tang") ||
        location.pathname.includes("/song")
      ) {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      }
    },
  });
};

export default useLikeItem;
