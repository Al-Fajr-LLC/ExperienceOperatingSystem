const path = require("path");
const fs = require("fs");
const { convert: convert_svg_to_png } = require("convert-svg-to-png");
const svg_to_ico = require("svg-to-ico");
const png_2_icons = require("png2icons");

const main_icon_path = path.join(__dirname, "./src/renderer/src/assets/logo.svg");
const out_rec_png_path = path.join(__dirname, "./resources/icon.png");
const out_png_path = path.join(__dirname, "./build/icon.png");
const out_ico_path = path.join(__dirname, "./build/icon.ico");
const out_icns_path = path.join(__dirname, "./build/icon.icns");

const main_icon = `
    <svg viewBox="0 0 20 20" height="255" width="255">
        ${fs.readFileSync(main_icon_path).toString()}
    </svg>
`;

convert_svg_to_png(main_icon).then((png) => {
    const icns = png_2_icons.createICNS(png, png_2_icons.BILINEAR, 0);
    fs.writeFileSync(out_png_path, png);
    fs.writeFileSync(out_png_path, png);
    fs.writeFileSync(out_rec_png_path, png);
    fs.writeFileSync(out_icns_path, icns);
});

const temp_svg_path = path.join(path.dirname(out_ico_path), "./source.svg");
fs.writeFileSync(temp_svg_path, main_icon);

svg_to_ico({
    input_name: temp_svg_path,
    output_name: out_ico_path,
    sizes: [ 64 ]
}).then(() => {
    function try_unlink() {
        try {
            console.log(`Trying to unlink '${temp_svg_path}'`);
            fs.unlinkSync(temp_svg_path);
            console.log("Cleanup successfull");
        } catch (_) {
            console.log(`Failed to unlink '${temp_svg_path}', trying again`);
            setTimeout(() => try_unlink(), 500);
        }
    }

    try_unlink();
}).catch((error) => {
    console.error(error);
});

