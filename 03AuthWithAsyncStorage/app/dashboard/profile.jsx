import { ThemedText, ThemedView } from "../../src/components";
import useUserContext from "../../src/hooks/useUserContext";

const Profile = () => {
  const { fullName } = useUserContext();
  return (
    <ThemedView>
      {fullName && <ThemedText>Hello {fullName}</ThemedText>}
    </ThemedView>
  );
};

export default Profile;
