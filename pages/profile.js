import { useUser } from '../lib/hooks';
import Layout from '../components/layout/Layout';
import { User } from "@nextui-org/react";

const Profile = () => {
  const user = useUser({ redirectTo: '/login' });

  return (
    <Layout>
      <h1>Profile</h1>
      {user && (
        <>
          {/* <p>You are Logged in as</p> */}
          <User
            src="https://i.pravatar.cc/150?u=a042581f4e25056704b"
            name={user.name}
            description="Description"
            zoomed
            size='xl'
            pointer
            bordered
            color='primary'
          />
          {/* <pre>{user.name}</pre> */}
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
