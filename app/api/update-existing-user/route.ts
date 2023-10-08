import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Function to update Username and Name columns for a user
async function updateUser(email: string | null, username: string | null, name: string | null) {
  try {
    if (!email) {
      throw new Error('Email is required to identify the user.');
    }

    // Initialize the UPDATE query
    let updateQuery;

    // Add conditions for updating Username and/or Name
    if (username && name) {
      updateQuery = sql`UPDATE Users2 SET Username = ${username}, Name = ${name} WHERE Email = ${email}`;
    } else if (username) {
      updateQuery = sql`UPDATE Users2 SET Username = ${username} WHERE Email = ${email}`;
    } else if (name) {
      updateQuery = sql`UPDATE Users2 SET Name = ${name} WHERE Email = ${email}`;
    } else {
      throw new Error('No updates provided.');
    }

    // Execute the UPDATE query
    const result = await updateQuery;

    if (result.rowCount === 1) {
      return NextResponse.json({ message: 'User updated successfully.' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found or no updates provided.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user.' }, { status: 500 });
  }
}

// Create a route for updating the Username and Name columns
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const email = searchParams.get('email');
  const username = searchParams.get('username');
  const name = searchParams.get('name');
  
  return updateUser(email, username, name);
}
