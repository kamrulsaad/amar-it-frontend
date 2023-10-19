import { TagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";
import { IMeta, IPackage } from "@/types";

const PACKAGES_URL = "/packages";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPackage: build.mutation({
      query: (packageData) => ({
        url: `${PACKAGES_URL}`,
        method: "POST",
        data: packageData,
      }),
      invalidatesTags: [TagTypes.packages],
    }),

    getPackages: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PACKAGES_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IPackage, meta: IMeta) => {
        return {
          packages: response,
          meta,
        };
      },
      providesTags: [TagTypes.packages],
    }),

    getPackage: build.query({
      query: (packageId) => ({
        url: `${PACKAGES_URL}/${packageId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.packages],
    }),

    updatePackage: build.mutation({
      query: ({ id, ...packageData }) => ({
        url: `${PACKAGES_URL}/${id}`,
        method: "PATCH",
        data: packageData,
      }),
      onQueryStarted: async (
        { packageData, id },
        { dispatch, queryFulfilled }
      ) => {
        dispatch(
          packageApi.util.updateQueryData("getPackage", id, (draft) => {
            Object.assign(draft, packageData);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            packageApi.util.updateQueryData("getPackage", id, (draft) => {
              Object.assign(draft, { id });
            })
          );
        }
      },
      invalidatesTags: [TagTypes.packages],
    }),

    deletePackage: build.mutation({
      query: (packageId: string) => ({
        url: `${PACKAGES_URL}/${packageId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.packages],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetPackageQuery,
  useGetPackagesQuery,
  useUpdatePackageMutation,
} = packageApi;
