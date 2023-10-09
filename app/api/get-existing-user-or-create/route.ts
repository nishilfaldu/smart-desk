import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const password = searchParams.get('password');
 
  try {
    if (!email || !password) throw new Error('Email and Password are required');
    // Check if the user with the given email exists in the database
    const existingUser = await sql`SELECT * FROM Users2 WHERE Email = ${email};`;
    console.log(existingUser);

    if (existingUser.rows.length > 0) {
        const user = existingUser.rows[0];
        if (user.email === email && user.password === password) {
          // User with the email already exists, return that user
          return NextResponse.json({ user }, { status: 200 });
        } else {
          // Password doesn't match
          return NextResponse.json(
            { errorMessage: "Password doesn't match" },
            { status: 500 }
          );
        }
      } else {
      // User with the email doesn't exist, insert a new user
      console.log("here")
      const newUser = await sql`INSERT INTO Users2 (Email, Password, Name, Username) VALUES (${email}, ${password}, ${email}, ${email});`;
      return NextResponse.json({ newUser }, { status: 200 });
    }
  } catch (error) {
    console.log("here with error", error)
    return NextResponse.json({ error }, { status: 500 });
  }  
}