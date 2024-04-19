import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const {sessionClaims} = auth();
  const role = sessionClaims?.role as string;
  console.log(role);
  
    if(role==='patient'){
      redirect('/patients');
    }else if(role==='doctor'){
      redirect('/doctor')
    }else if(role==='admin'){
      redirect("/admin")
    }
}
