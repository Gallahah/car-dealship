import Logo from "@/assets/Logo.png";
import CustomLink from "@/components/CustomLink";

const Footer = () => {
    return (
        <footer className="bg-primary-100 py-16 mt-20">
            <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
                <div className="mt-16 basis-1/2 md:mt-0">
                    <CustomLink to="/"><img alt="logo" src={Logo} /></CustomLink>
                    <div className="my-5">
                        <h2>Курсова Задача ПИП</h2>
                        <h4>Николай Димитров, 12220125</h4>
                        <h4>Антонио Атанасов, 12220107</h4>
                        <h4>Милана Боева, 12220121</h4>
                    </div>
                    <p>NAM© Car Dealeship Site</p>
                </div>
                <div className="mt-16 basis-1/4 md:mt-0">
                    <h4 className="font-bold">Links</h4>
                    <p className="my-5"><a href="https://github.com/Gallahah">Github</a></p>
                    <p className="my-5"><a href="https://instagram.com">Instagram</a></p>
                    <p className="my-5"><a href="https://facebook.com">Facebook</a></p>
                    <p><a href="https://linkedin.com/">LinkedIn</a></p>
                </div>
                <div className="mt-16 basis-1/4 md:mt-0">
                    <h4 className="font-bold">Contact Us</h4>
                    <p className="my-5">Tempus metus mattis risus volutpat egestas.</p>
                    <p>(888) 888 8888</p>

                </div>

            </div>
        </footer>
    );
};
export default Footer;