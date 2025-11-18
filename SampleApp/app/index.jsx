import { Spacer, ThemedLink, ThemedText, ThemedView } from "../src/components";

const Home = () => {
  return (
    <ThemedView>
      <ThemedText isTitle={true}>utkarshakya</ThemedText>
      <Spacer />
      <ThemedLink url={"/auth"}>Get Started</ThemedLink>
      <Spacer height={10} />
      <ThemedLink url={"/dashboard"}>Dashboard</ThemedLink>
    </ThemedView>
  );
};

export default Home;
