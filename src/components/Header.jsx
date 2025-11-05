import chefLogo from "../assets/chef-hat.svg";
export default function Header() {
  return (
    <header>
      <img src={chefLogo} alt="Chef Logo"/>
      <h1>Smart Chef</h1>
    </header>
  );
}