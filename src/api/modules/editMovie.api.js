import privateClient from "../client/private.client";

const createMovieEndpoints = {
  simpleEdit: "/admin/editMovie",
  withImage: "/admin/editMovie/newImage",
};

const apiEditMovie = {
  editMovie: async ({ poster, backdrop, ...data }) => {
    const isPosterNew = poster instanceof FileList;
    const isBackdropNew = backdrop instanceof FileList;

    if (isPosterNew || isBackdropNew) {
      try {
        const formData = new FormData();
        formData.append("poster", isPosterNew ? poster[0] : poster);
        formData.append("backdrop", isBackdropNew ? backdrop[0] : backdrop);
        Object.entries(data).forEach(([key, value]) => {
          formData.set(key, value);
        });

        console.log(formData);
        const response = await privateClient.put(
          createMovieEndpoints.withImage,
          formData,

          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        return { response };
      } catch (err) {
        return { err };
      }
    } else
      try {
        const response = await privateClient.put(
          createMovieEndpoints.simpleEdit,
          { poster, backdrop, ...data }
        );
        return { response };
      } catch (err) {
        return { err };
      }
  },
};

export default apiEditMovie;
