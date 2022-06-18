import type { NextPage } from "next";
import { useRouter } from "next/router";

const TenantHome: NextPage = ({}) => {
  const router = useRouter();

  console.log(router.query);

  return <div>Tenant Home</div>;
};

export default TenantHome;
