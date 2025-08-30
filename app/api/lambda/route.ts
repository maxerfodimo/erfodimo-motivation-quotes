import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://2ub1bu2zmi.execute-api.eu-central-1.amazonaws.com/default/erfodimo-motivational-quotes',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Lambda:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Lambda' },
      { status: 500 }
    );
  }
} 