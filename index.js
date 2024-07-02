const waitWithPromise = async () => new Promise((resolve) => {
  setTimeout(resolve, 200);
});

const onButtonClicked = async () => {
  const items = document.querySelectorAll('.megaPhotoThmbItem img');
  const downloadImage = async (url, filename) => {
    const resp = await fetch(url);
      const blob = await resp.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      await waitWithPromise();
      window.URL.revokeObjectURL(downloadUrl);
  };

  for(let index = 0; index < items.length; index++) {
    const element = items[index];
    const link = element.getAttribute('data-source');
    if (!link) {
      return;
    }
    const ext = link.slice(link.lastIndexOf('.')+1);
    await downloadImage(link, `gorsel_${index + 1}.${ext}`);
  }
}

const container = document.querySelector('.classified-images-status');
const style = document.createElement('style');
style.innerHTML = `
#gorselleriIndir {
  font-stretch: normal;
  font-style: normal;
  font-variant: normal;
  position:absolute;
  right:20px;
  top:8px;
  font-family: "SHBGroteskLegacy",Roboto,sans-serif;
  font-stretch: normal;
  font-style: normal;
  font-variant: normal;
  line-height: normal;
  text-size-adjust: none;
  letter-spacing: .1px;
  text-align: center;
  margin: 0;
  padding: 0;
  background: no-repeat 0 0;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  background-color: #ffc000;
  color: #333;
  border-radius: 10px;
  padding: 5px;
  font-size: 15px;
  font-weight: 800;
  border:none;
}
#gorselleriIndir:hover {
  background-color: #edb302;
}
`;
container.append(style);
const b = document.createElement('button');
b.innerHTML = 'Görselleri İndir';
b.id = "gorselleriIndir";
b.onclick = onButtonClicked;
container.append(b);
