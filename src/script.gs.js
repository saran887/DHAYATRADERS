// @OnlyCurrentDoc
// ============================================================
// GLOBAL CONFIGURATION CONSTANTS
// ============================================================
const OWNER_EMAIL = "info@dhayatraders.in";            // Your email for booking copies
const COMPANY_NAME = "DHAYA TRADERS";
const COMPANY_TAGLINE = "Your Trusted Trading Partner";
const COMPANY_PHONE = "+91 9965 084 471";
const COMPANY_LOCATION = "3/112 Annai Garden, Perumampalayam, Thuduppadhi Post, Perundurai, 638057";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/9oaLJBNpBZBiLL3D7?g_st=aw";
const LOGO_URL = "https://dhayatraders.in/logo.webp";
const CALENDAR_ID = "primary";                              // Uses default personal Google Calendar

// ============================================================
// MAIN WEB APP TRIGGER (Handles Incoming Form Data)
// ============================================================
function doGet(e) {
    const action = e.parameter ? e.parameter.action : null;

    if (action === "availability") {
        return jsonResponse(getAvailability(e.parameter.date));
    }

    return jsonResponse({ success: false, error: "Unknown action" });
}

function getAvailability(dateStr) {
    if (!dateStr) {
        return { success: false, error: "Missing date parameter" };
    }

    const cal = CalendarApp.getCalendarById(CALENDAR_ID) || CalendarApp.getDefaultCalendar();
    const dayStart = new Date(dateStr + "T00:00:00");
    const dayEnd = new Date(dateStr + "T23:59:59");

    const events = cal.getEvents(dayStart, dayEnd);
    const busySlots = events.map(ev => ({
        start: ev.getStartTime().toISOString(),
        end: ev.getEndTime().toISOString()
    }));

    const slots = [];
    const workStart = 9, workEnd = 18;
    for (let hour = workStart; hour < workEnd; hour++) {
        for (let min = 0; min < 60; min += 30) {
            const slotStart = new Date(dateStr + "T" + String(hour).padStart(2, "0") + ":" + String(min).padStart(2, "0") + ":00");
            const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);

            const isBusy = events.some(ev =>
                slotStart < ev.getEndTime() && slotEnd > ev.getStartTime()
            );

            if (!isBusy && slotStart > new Date()) {
                slots.push(slotStart.toISOString());
            }
        }
    }

    return { success: true, date: dateStr, availableSlots: slots, busySlots: busySlots };
}

function doPost(e) {
    const lock = LockService.getScriptLock();
    try {
        if (!lock.tryLock(10000)) {
            return jsonResponse({ success: false, error: "System busy. Please try again." });
        }

        // Merge parameters from both e.parameter and JSON body if sent
        let params = (e && e.parameter) ? e.parameter : {};
        if (e && e.postData && e.postData.contents) {
            try {
                const bodyJson = JSON.parse(e.postData.contents);
                params = Object.assign({}, params, bodyJson);
            } catch (jsonErr) { }
        }

        const name = params.name || "Valued Client";
        const email = params.email || "";
        const phone = params.phone || "N/A";
        const propertyType = params.propertyType || "N/A";
        const consultationType = params.consultationType || "General";
        const preferredDate = params.preferredDate || ""; // Format: YYYY-MM-DD
        const preferredTime = params.preferredTime || ""; // Format: HH:MM
        const message = params.message || "N/A"; // Client requirement message

        if (!email || !preferredDate) {
            return jsonResponse({ success: false, error: "Missing required booking details (Email / Date)." });
        }

        let bookingStart;
        if (preferredTime) {
            bookingStart = new Date(preferredDate + "T" + preferredTime + ":00");
        } else {
            bookingStart = new Date(preferredDate + "T09:00:00");
        }

        const bookingEnd = new Date(bookingStart.getTime() + (30 * 60 * 1000));

        // --------------------------------------------------------
        // CALENDAR & GOOGLE MEET GENERATION
        // --------------------------------------------------------
        let meetLink = "N/A";

        try {
            const eventResource = {
                summary: "Consultation: " + name + " (" + consultationType + ")",
                description: "Property Type: " + propertyType + "\nPhone: " + phone + "\nMessage: " + message,
                start: { dateTime: bookingStart.toISOString() },
                end: { dateTime: bookingEnd.toISOString() },
                attendees: [
                    { email: email, displayName: name },
                    { email: OWNER_EMAIL, displayName: "Admin" }
                ],
                conferenceData: {
                    createRequest: {
                        requestId: "dhaya_" + new Date().getTime(),
                        conferenceSolutionKey: { type: "hangoutsMeet" }
                    }
                }
            };

            const createdEvent = Calendar.Events.insert(eventResource, CALENDAR_ID, {
                conferenceDataVersion: 1
            });

            if (createdEvent.conferenceData && createdEvent.conferenceData.entryPoints) {
                const meetEntryPoint = createdEvent.conferenceData.entryPoints.find(ep => ep.entryPointType === "video");
                if (meetEntryPoint) {
                    meetLink = meetEntryPoint.uri;
                }
            }
        } catch (calError) {
            console.error("Calendar Engine Error: " + calError.toString());
            try {
                const cal = CalendarApp.getCalendarById(CALENDAR_ID) || CalendarApp.getDefaultCalendar();
                cal.createEvent(
                    "Consultation: " + name + " (" + consultationType + ")",
                    bookingStart,
                    bookingEnd,
                    { description: "Phone: " + phone + "\nMessage: " + message, guests: email + "," + OWNER_EMAIL }
                );
                meetLink = "N/A (Activate Advanced Calendar API for Meet Links)";
            } catch (fallbackError) {
                console.error("Fallback Event Generation Failed: " + fallbackError.toString());
            }
        }

        // --------------------------------------------------------
        // APPEND DATA ENTRY TO SPREADSHEET ROW
        // --------------------------------------------------------
        const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = spreadsheet.getSheetByName("Enquiries") || spreadsheet.getSheets()[0];

        sheet.appendRow([
            new Date(),       // Column A: Submission Timestamp
            name,             // Column B
            email,            // Column C
            phone,            // Column D
            propertyType,     // Column E
            consultationType, // Column F
            preferredDate,    // Column G
            preferredTime,    // Column H
            message,          // Column I: Client Message Box Input
            meetLink          // Column J: Google Meet Link
        ]);

        // --------------------------------------------------------
        // RENDER EMAIL CONTENT & SEND VIA GMAIL APP
        // --------------------------------------------------------
        const emailSubject = "Confirmed Appointment & Meeting Details - " + COMPANY_NAME;
        const htmlBodyContent = buildEmailTemplate(name, preferredDate, preferredTime, consultationType, propertyType, message, meetLink);

        GmailApp.sendEmail(email, emailSubject, "", {
            name: COMPANY_NAME,
            htmlBody: htmlBodyContent
        });

        GmailApp.sendEmail(OWNER_EMAIL, "New Booking Notification: " + name, "", {
            name: COMPANY_NAME,
            htmlBody: htmlBodyContent
        });

        return jsonResponse({ success: true, meetLink: meetLink });

    } catch (error) {
        console.error("Main Application Execution Failure: " + error.toString());
        return jsonResponse({ success: false, error: error.toString() });
    } finally {
        lock.releaseLock();
    }
}

// ============================================================
// CORE HTML LAYOUT GENERATION UTILITY
// ============================================================
function buildEmailTemplate(name, date, time, consultation, property, message, meetLink) {
    return `
    <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: #E8EDF2; background-color: #0D2136; max-width: 600px; margin: 0 auto; border: 1px solid #1B3A5C; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
      <div style="text-align: center; padding: 40px 20px 30px; background-color: #0A1929; border-bottom: 2px solid #2E6B9E; position: relative;">
        <img src="${LOGO_URL}" alt="${COMPANY_NAME}" style="max-width: 140px; height: auto; margin-bottom: 15px;" />
        <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">${COMPANY_NAME}</h2>
        <p style="color: #4AABB8; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; font-size: 10px; margin: 5px 0 0 0;">${COMPANY_TAGLINE}</p>
      </div>
      
      <div style="padding: 35px 30px;">
        <p style="font-size: 16px; margin-top: 0; color: #ffffff;">Dear <strong style="color: #4AABB8;">${name}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1;">Your appointment has been securely processed and scheduled. Please review your meeting details below:</p>
        
        <div style="background-color: #122C47; border: 1px solid #1B3A5C; border-radius: 10px; padding: 25px; margin: 30px 0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #94a3b8; font-weight: 700; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Date</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #ffffff; font-weight: 600;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #94a3b8; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Time Slot</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #ffffff; font-weight: 600;">${time || "TBD"} <span style="color: #4AABB8; font-size: 12px; font-weight: normal;">(30 Mins)</span></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #94a3b8; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Consultation</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #ffffff; font-weight: 600;">${consultation}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #94a3b8; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Requirement</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #ffffff; font-weight: 600;">${property}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #94a3b8; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Message</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1B3A5C; color: #cbd5e1; line-height: 1.5;">${message}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #94a3b8; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; margin: 0 0 15px 0;">Virtual Meeting Link</p>
            ${meetLink !== "N/A" && meetLink.indexOf("http") === 0 
              ? `<a href="${meetLink}" style="display: inline-block; background-color: #4AABB8; color: #0D2136; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(74, 171, 184, 0.3);">Join Google Meet</a>` 
              : `<span style="display: inline-block; background-color: #1e3a5f; color: #94a3b8; padding: 14px 28px; border-radius: 8px; font-size: 14px; font-style: italic;">${meetLink}</span>`}
          </div>
        </div>

        <div style="background-color: #0A1929; padding: 25px; border-radius: 10px; border-left: 4px solid #4AABB8;">
          <h4 style="margin: 0 0 12px 0; color: #ffffff; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Office Headquarters</h4>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #cbd5e1; line-height: 1.5;"><strong style="color: #4AABB8; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Location:</strong><br/> <a href="${GOOGLE_MAPS_URL}" style="color: #ffffff; text-decoration: none; font-weight: 500;">${COMPANY_LOCATION}</a></p>
          <p style="margin: 0; font-size: 13px; color: #cbd5e1;"><strong style="color: #4AABB8; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Helpline:</strong><br/> <span style="color: #ffffff; font-weight: 500;">${COMPANY_PHONE}</span></p>
        </div>

        <p style="font-size: 11px; color: #64748b; text-align: center; margin-top: 35px; border-top: 1px solid #1B3A5C; padding-top: 20px; line-height: 1.6;">
          This is an automated appointment confirmation from <strong>${COMPANY_NAME}</strong>.<br>
          Please do not reply directly to this system-generated email.
        </p>
      </div>
    </div>
  `;
}

function jsonResponse(obj) {
    return ContentService.createTextOutput(JSON.stringify(obj))
        .setMimeType(ContentService.MimeType.JSON);
}
