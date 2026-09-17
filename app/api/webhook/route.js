import { NextResponse } from "next/server";
import { getFormById } from "@/lib/forms";

export async function POST(request) {
  try {
    const body = await request.json();
    const { formId, name, country, contact } = body;

    const form = getFormById(formId) || getFormById("pearlshire");

    if (!form) {
      return NextResponse.json(
        { success: false, error: "Form configuration not found" },
        { status: 404 }
      );
    }

    console.log(`API Route: Received submission for form [${form.id} - ${form.title}]`);
    console.log("API Route: Forwarding payload to webhook:", form.webhookUrl);

    // Forward clean payload expected by Make.com webhooks
    const payload = { name, country, contact };

    const response = await fetch(form.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("API Route: Webhook response status:", response.status);

    const responseData = await response.text();
    console.log("API Route: Webhook response:", responseData);

    if (response.ok) {
      return NextResponse.json(
        { success: true, message: "Data sent successfully", form: form.id },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `Webhook returned status ${response.status}`,
          details: responseData,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("API Route: Error forwarding to webhook:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send data to webhook",
      },
      { status: 500 }
    );
  }
}
