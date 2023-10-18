import { TagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";
import { IMeta, IPermission } from "@/types";

const PERMISSION_URL = "/permissions";

export const permissionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPermission: build.mutation({
      query: (permissionData) => ({
        url: `${PERMISSION_URL}`,
        method: "POST",
        data: permissionData,
      }),
      invalidatesTags: [TagTypes.permissions],
    }),

    getPermissions: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PERMISSION_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IPermission, meta: IMeta) => {
        return {
          permissions: response,
          meta,
        };
      },
      providesTags: [TagTypes.permissions],
    }),

    getPermission: build.query({
      query: (permissionId) => ({
        url: `${PERMISSION_URL}/${permissionId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.permissions],
    }),

    updatePermission: build.mutation({
      query: ({ id, ...permissionData }) => ({
        url: `${PERMISSION_URL}/${id}`,
        method: "PATCH",
        data: permissionData,
      }),
      onQueryStarted: async (
        { permissionData, id },
        { dispatch, queryFulfilled }
      ) => {
        dispatch(
          permissionApi.util.updateQueryData("getPermission", id, (draft) => {
            Object.assign(draft, permissionData);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            permissionApi.util.updateQueryData("getPermission", id, (draft) => {
              Object.assign(draft, { id });
            })
          );
        }
      },
      invalidatesTags: [TagTypes.permissions],
    }),

    deletePermission: build.mutation({
      query: (permissionId) => ({
        url: `${PERMISSION_URL}/${permissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.permissions],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionQuery,
  useGetPermissionsQuery,
  useUpdatePermissionMutation,
} = permissionApi;
