import { gql, useQuery } from "@apollo/client";
import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Skeleton from "../components/skeleton";

const Home = () => {
  const { data, loading } = useQuery(gql`
    query GetDevices {
      getDevices {
        name
        type
      }
    }
  `);

  return (
    <>
      <div className="flex flex-wrap w-full space-y-4 md:space-y-0 md:space-x-4 h-full m-4">
        <div className="shadow-lg rounded-xl bg-blue-500 w-full md:w-64 p-6 dark:bg-gray-800 overflow-hidden">
          <p className="text-white text-xl">Current status</p>
          <div className="flex items-center my-4 text-blue-500 rounded justify-between">
            <span className="rounded-lg p-2 bg-white">
              <svg
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"></path>
              </svg>
            </span>
            <div className="flex flex-col w-full ml-2 items-start justify-evenly">
              <p className="text-white text-lg">45%</p>
              <p className="text-blue-200 text-sm">CPU usage</p>
            </div>
          </div>
          <div className="flex items-center text-blue-500 rounded justify-between">
            <span className="rounded-lg p-2 bg-white">
              <svg
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
              </svg>
            </span>
            <div className="flex flex-col w-full ml-2 items-start justify-evenly">
              <p className="text-white text-lg">27</p>
              <p className="text-blue-200 text-sm">Failed commands</p>
            </div>
          </div>
        </div>

        <div className="shadow-lg rounded-xl bg-blue-500 w-full md:w-64 p-6 dark:bg-gray-800 overflow-hidden">
          <p className="text-white text-xl">Devices</p>
          {loading ? (
            <Skeleton />
          ) : (
            data?.getDevices?.map((device, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center text-blue-500 rounded justify-between mt-4"
                >
                  <span className="rounded-lg p-2 bg-white" onClick={() => {}}>
                    <svg
                      className={`fill-current h-5 w-5 mx-auto ${
                        device.isActive ? "text-green-500" : "text-gray-500"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <div className="flex flex-col w-full ml-2 items-start justify-evenly">
                    <p className="text-white text-lg">{device.name}</p>
                    <p className="text-blue-200 text-sm">
                      <span className="font-bold">Current status:</span>{" "}
                      {device.isActive ? "on" : "off"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { accessToken } = await getAccessToken(context.req, context.res);

    return {
      props: { accessToken },
    };
  } catch {
    return { props: {} };
  }
}

export default withPageAuthRequired(Home);
