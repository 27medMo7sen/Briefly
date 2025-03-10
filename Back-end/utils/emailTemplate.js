export const emailTemplate = ({ link, linkData, subject, buttonText }) => {
    return `<!--
  * This email was built using Tabular.
  * For more information, visit https://tabular.email
  -->
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="en"
  >
    <head>
      <title></title>
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <!--[if !mso]>-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta name="x-apple-disable-message-reformatting" content="" />
      <meta content="target-densitydpi=device-dpi" name="viewport" />
      <meta content="true" name="HandheldFriendly" />
      <meta content="width=device-width" name="viewport" />
      <meta
        name="format-detection"
        content="telephone=no, date=no, address=no, email=no, url=no"
      />
      <style type="text/css">
        table {
          border-collapse: separate;
          table-layout: fixed;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        table td {
          border-collapse: collapse;
        }
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        .gmail-mobile-forced-width {
          display: none;
          display: none !important;
        }
        body,
        a,
        li,
        p,
        h1,
        h2,
        h3 {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
        html {
          -webkit-text-size-adjust: none !important;
        }
        body,
        #innerTable {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        #innerTable img + div {
          display: none;
          display: none !important;
        }
        img {
          margin: 0;
          padding: 0;
          -ms-interpolation-mode: bicubic;
        }
        h1,
        h2,
        h3,
        p,
        a {
          line-height: inherit;
          overflow-wrap: normal;
          white-space: normal;
          word-break: break-word;
        }
        a {
          text-decoration: none;
        }
        h1,
        h2,
        h3,
        p {
          min-width: 100% !important;
          width: 100% !important;
          max-width: 100% !important;
          display: inline-block !important;
          border: 0;
          padding: 0;
          margin: 0;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        u + #body a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
        a[href^="mailto"],
        a[href^="tel"],
        a[href^="sms"] {
          color: inherit;
          text-decoration: none;
        }
      </style>
      <style type="text/css">
        @media (min-width: 481px) {
          .hd {
            display: none !important;
          }
        }
      </style>
      <style type="text/css">
        @media (max-width: 480px) {
          .hm {
            display: none !important;
          }
        }
      </style>
      <style type="text/css">
        @media (max-width: 480px) {
          .t18,
          .t21,
          .t5,
          .t9 {
            width: 400px !important;
          }
          .t20,
          .t23 {
            mso-line-height-alt: 0px !important;
            line-height: 0 !important;
            display: none !important;
          }
          .t21 {
            padding: 40px !important;
            border-radius: 0 !important;
          }
        }
      </style>
      <style type="text/css">
        @media (max-width: 480px) {
          [class~="x_t20"] {
            mso-line-height-alt: 0px !important;
            line-height: 0px !important;
            display: none !important;
          }
          [class~="x_t23"] {
            mso-line-height-alt: 0px !important;
            line-height: 0px !important;
            display: none !important;
          }
          [class~="x_t21"] {
            padding-left: 40px !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            padding-right: 40px !important;
            border-top-left-radius: 0px !important;
            border-top-right-radius: 0px !important;
            border-bottom-right-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
            width: 400px !important;
          }
          [class~="x_t5"] {
            width: 400px !important;
          }
          [class~="x_t9"] {
            width: 400px !important;
          }
          [class~="x_t18"] {
            width: 400px !important;
          }
        }
      </style>
      <!--[if !mso]>-->
      <link
        href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;700;800&amp;family=Inter+Tight:wght@900&amp;display=swap"
        rel="stylesheet"
        type="text/css"
      />
      <!--<![endif]-->
      <!--[if mso]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
    </head>
    <body
      id="body"
      class="t26"
      style="
        min-width: 100%;
        margin: 0px;
        padding: 0px;
        background-color: #f4f4f4;
      "
    >
      <div class="t25" style="background-color: #f4f4f4">
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          align="center"
        >
          <tr>
            <td
              class="t24"
              style="
                font-size: 0;
                line-height: 0;
                mso-line-height-rule: exactly;
                background-color: #f4f4f4;
              "
              valign="top"
              align="center"
            >
              <!--[if mso]>
                <v:background
                  xmlns:v="urn:schemas-microsoft-com:vml"
                  fill="true"
                  stroke="false"
                >
                  <v:fill color="#F4F4F4" />
                </v:background>
              <![endif]-->
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                align="center"
                id="innerTable"
              >
                <tr>
                  <td>
                    <div
                      class="t20"
                      style="
                        mso-line-height-rule: exactly;
                        mso-line-height-alt: 60px;
                        line-height: 60px;
                        font-size: 1px;
                        display: block;
                      "
                    >
                      &nbsp;&nbsp;
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table
                      class="t22"
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      style="margin-left: auto; margin-right: auto"
                    >
                      <tr>
                        <!--[if mso]>
  <td width="600" class="t21" style="background-color:#FFFFFF;overflow:hidden;padding:60px 60px 60px 60px;border-radius:8px 8px 8px 8px;">
  <![endif]-->
                        <!--[if !mso]>-->
                        <td
                          class="t21"
                          style="
                            background-color: #ffffff;
                            overflow: hidden;
                            width: 480px;
                            padding: 60px 60px 60px 60px;
                            border-radius: 8px 8px 8px 8px;
                          "
                        >
                          <!--<![endif]-->
                          <table
                            role="presentation"
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            style="width: 100% !important"
                          >
                            <tr>
                              <td align="left">
                                <table
                                  class="t2"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="margin-right: auto"
                                >
                                  <tr>
                                    <!--[if mso]>
  <td width="155" class="t1" style="padding:0 15px 0 0;">
  <![endif]-->
                                    <!--[if !mso]>-->
                                    <td
                                      class="t1"
                                      style="width: 140px; padding: 0 15px 0 0"
                                    >
                                      <!--<![endif]-->
                                      <div style="font-size: 0px">
                                        <img
                                          class="t0"
                                          style="
                                            display: block;
                                            border: 0;
                                            height: auto;
                                            width: 100%;
                                            margin: 0;
                                            max-width: 100%;
                                          "
                                          width="140"
                                          height="49.4375"
                                          alt=""
                                          src="https://res.cloudinary.com/doou4eolq/image/upload/v1738547531/lx588joeqpjkbxuchrcz.png"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div
                                  class="t3"
                                  style="
                                    mso-line-height-rule: exactly;
                                    mso-line-height-alt: 42px;
                                    line-height: 42px;
                                    font-size: 1px;
                                    display: block;
                                  "
                                >
                                  &nbsp;&nbsp;
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  class="t6"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="margin-left: auto; margin-right: auto"
                                >
                                  <tr>
                                    <!--[if mso]>
  <td width="480" class="t5">
  <![endif]-->
                                    <!--[if !mso]>-->
                                    <td class="t5" style="width: 480px">
                                      <!--<![endif]-->
                                      <h1
                                        class="t4"
                                        style="
                                          margin: 0;
                                          margin: 0;
                                          font-family:
                                            Albert Sans,
                                            BlinkMacSystemFont,
                                            Segoe UI,
                                            Helvetica Neue,
                                            Arial,
                                            sans-serif;
                                          line-height: 41px;
                                          font-weight: 800;
                                          font-style: normal;
                                          font-size: 39px;
                                          text-decoration: none;
                                          text-transform: none;
                                          letter-spacing: -1.56px;
                                          direction: ltr;
                                          color: #333333;
                                          text-align: left;
                                          mso-line-height-rule: exactly;
                                          mso-text-raise: 1px;
                                        "
                                      >
                                        ${subject}
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div
                                  class="t7"
                                  style="
                                    mso-line-height-rule: exactly;
                                    mso-line-height-alt: 16px;
                                    line-height: 16px;
                                    font-size: 1px;
                                    display: block;
                                  "
                                >
                                  &nbsp;&nbsp;
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  class="t10"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="margin-left: auto; margin-right: auto"
                                >
                                  <tr>
                                    <!--[if mso]>
  <td width="480" class="t9">
  <![endif]-->
                                    <!--[if !mso]>-->
                                    <td class="t9" style="width: 480px">
                                      <!--<![endif]-->
                                      <p
                                        class="t8"
                                        style="
                                          margin: 0;
                                          margin: 0;
                                          font-family:
                                            Albert Sans,
                                            BlinkMacSystemFont,
                                            Segoe UI,
                                            Helvetica Neue,
                                            Arial,
                                            sans-serif;
                                          line-height: 21px;
                                          font-weight: 400;
                                          font-style: normal;
                                          font-size: 16px;
                                          text-decoration: none;
                                          text-transform: none;
                                          letter-spacing: -0.64px;
                                          direction: ltr;
                                          color: #333333;
                                          text-align: left;
                                          mso-line-height-rule: exactly;
                                          mso-text-raise: 2px;
                                        "
                                      >
                                     ${linkData}
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div
                                  class="t12"
                                  style="
                                    mso-line-height-rule: exactly;
                                    mso-line-height-alt: 35px;
                                    line-height: 35px;
                                    font-size: 1px;
                                    display: block;
                                  "
                                >
                                  &nbsp;&nbsp;
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                <table
                                  class="t14"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="margin-right: auto"
                                >
                                  <tr>
                                    <!--[if mso]>
  <td width="105" class="t13" style="background-color:#0062FF;overflow:hidden;text-align:center;line-height:34px;mso-line-height-rule:exactly;mso-text-raise:6px;border-radius:40px 40px 40px 40px;">
  <![endif]-->
                                    <!--[if !mso]>-->
                                    <td
                                      class="t13"
                                      style="
                                        background-color: #0062ff;
                                        overflow: hidden;
                                        width: 105px;
                                        text-align: center;
                                        line-height: 34px;
                                        mso-line-height-rule: exactly;
                                        mso-text-raise: 6px;
                                        border-radius: 40px 40px 40px 40px;
                                      "
                                    >
                                      <!--<![endif]-->
                                      <a
                                        href="${link}"
                                        style="text-decoration: none"
                                      >
                                        <span
                                          class="t11"
                                          style="
                                            display: block;
                                            margin: 0;
                                            margin: 0;
                                            font-family:
                                              Inter Tight,
                                              BlinkMacSystemFont,
                                              Segoe UI,
                                              Helvetica Neue,
                                              Arial,
                                              sans-serif;
                                            line-height: 34px;
                                            font-weight: 900;
                                            font-style: normal;
                                            font-size: 13px;
                                            text-decoration: none;
                                            text-transform: uppercase;
                                            direction: ltr;
                                            color: #ffffff;
                                            text-align: center;
                                            mso-line-height-rule: exactly;
                                            mso-text-raise: 6px;
                                            background-color: #000000;
                                            padding: 10px 20px;
                                            border-radius: 40px;
                                          "
                                        >
                                          ${buttonText}
                                        </span>
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div
                                  class="t17"
                                  style="
                                    mso-line-height-rule: exactly;
                                    mso-line-height-alt: 35px;
                                    line-height: 35px;
                                    font-size: 1px;
                                    display: block;
                                  "
                                >
                                  &nbsp;&nbsp;
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  class="t19"
                                  role="presentation"
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="margin-left: auto; margin-right: auto"
                                >
                                  <tr>
                                    <!--[if mso]>
  <td width="480" class="t18">
  <![endif]-->
                                    <!--[if !mso]>-->
                                    <td class="t18" style="width: 480px">
                                      <!--<![endif]-->
                                      <p
                                        class="t16"
                                        style="
                                          margin: 0;
                                          margin: 0;
                                          font-family:
                                            Albert Sans,
                                            BlinkMacSystemFont,
                                            Segoe UI,
                                            Helvetica Neue,
                                            Arial,
                                            sans-serif;
                                          line-height: 21px;
                                          font-weight: 400;
                                          font-style: normal;
                                          font-size: 16px;
                                          text-decoration: none;
                                          text-transform: none;
                                          letter-spacing: -0.64px;
                                          direction: ltr;
                                          color: #333333;
                                          text-align: left;
                                          mso-line-height-rule: exactly;
                                          mso-text-raise: 2px;
                                        "
                                      >
                                        Didn&#39;t register on Briefly.com?
                                        <a
                                          class="t15"
                                          href="https://google.com"
                                          style="
                                            margin: 0;
                                            margin: 0;
                                            font-weight: 700;
                                            font-style: normal;
                                            text-decoration: none;
                                            direction: ltr;
                                            color: #2f353d;
                                            mso-line-height-rule: exactly;
                                          "
                                          target="_blank"
                                          >Click here.</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      class="t23"
                      style="
                        mso-line-height-rule: exactly;
                        mso-line-height-alt: 60px;
                        line-height: 60px;
                        font-size: 1px;
                        display: block;
                      "
                    >
                      &nbsp;&nbsp;
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div
        class="gmail-mobile-forced-width"
        style="white-space: nowrap; font: 15px courier; line-height: 0"
      >
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      </div>
    </body>
  </html>
  `;
  };