import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BlogsPage } from "@/components/Blogs/blogs-page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
};

const Blogs = () => {
  return (
    <>
      <Breadcrumb pageName="Blogs" />

      <BlogsPage />
    </>
  );
};

export default Blogs;
