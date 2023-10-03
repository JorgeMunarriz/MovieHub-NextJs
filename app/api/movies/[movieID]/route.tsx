import { prismaClient } from "@/config/prismaClient";
import { convertToType } from "@/utils/convertToType";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    movieID : string
}

export async function GET (req: Request, res: Response, {movieID}: Props) {
    
    try {
      const movie = await prismaClient.publicmovies.findUnique({
        where: { id: convertToType(movieID) },
        include: { genres: true },
      });
  
      if (!movie) {
        return NextResponse.json({ msg: "Movie not found" });
      }
      
  
      return NextResponse.json(movie);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  };