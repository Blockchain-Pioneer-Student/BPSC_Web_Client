import * as bcrypt from 'bcryptjs';
async function main(){
    const pass = "12345678";
    const hashedPass = await bcrypt.hash(pass, 10);
    console.log(hashedPass);
}
main();