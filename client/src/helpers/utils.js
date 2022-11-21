/* utils.js: useful utilities */

/**
 * Given a long address, replace all ', ' with '<br />'.
 * Return it in a "dangerous" <span> so React won't escape the <br /> tags.
 */

function breakAddr(addr) {
<<<<<<< HEAD
  console.log(addr);
=======
  //console.log("breakAddr", addr)
>>>>>>> main
  let addrWithBrs = addr.replace(/, /g, "<br />");
  return <span dangerouslySetInnerHTML={{ __html: addrWithBrs }}></span>;
}

export { breakAddr };
