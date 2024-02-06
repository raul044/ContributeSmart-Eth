function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  return (
    <footer>
      <h2 style={{textAlign: "center", color:"white"}}> Trade your skill </h2>
      
    </footer >
  );
}

export default Footer;
