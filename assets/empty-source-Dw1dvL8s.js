const e={public:{directory:{"index.html":{file:{contents:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NOLLM To-Do Application</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    .rounded-border {
      border-radius: 8px; /* Adjust the value as needed */
    }
    .custom-checkbox {
      appearance: none;
      outline: none;
      display: block;
      position: relative;
      text-align: center;
      cursor: pointer;
      margin: auto;
      width: 1.25rem; /* 5 * 0.25rem */
      height: 1.25rem; /* 5 * 0.25rem */
    }
    .custom-checkbox::before {
      content: '';
      display: block;
      position: absolute;
      width: 1.25rem; /* 5 * 0.25rem */
      height: 1.25rem; /* 5 * 0.25rem */
      border-radius: 0.125rem; /* rounded-sm */
      border: 2px solid black;
      transition: background-color 0.2s;
    }
    .custom-checkbox:hover::before {
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 1);
    }
    .custom-checkbox::after {
      content: '';
      display: block;
      position: absolute;
      left: 0.375rem; /* 1.5 * 0.25rem */
      top: 0.125rem; /* 0.5 * 0.25rem */
      width: 0.5rem; /* 2 * 0.25rem */
      height: 0.75rem; /* 3 * 0.25rem */
      border-right: 2px solid black;
      border-bottom: 2px solid black;
      transform-origin: center;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .custom-checkbox:checked::before {
      background-color: #F1F2F4;
    }
    .custom-checkbox:checked::after {
      opacity: 1;
    }
    /* Hover styles for input field */
    input[type="text"]:hover {
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 1);
    }
    /* Hover styles for buttons */
    button:hover {
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 1);
    }
    li:hover {
      box-shadow: 2px 2px 0px rgba(0, 0, 0, 1);
    }
  </style>
</head>
<body class="bg-gray-100 p-6">
  <div class="max-w-lg mx-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-center">To-Do Application</h1>
    </header>
    <div class="flex justify-between mb-4">
      <input type="text" id="taskInput" class="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-border" placeholder="Add a new task">
      <button onclick="addTask()" class="ml-2 h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-border">Add</button>
    </div>
    <ul id="taskList" class="space-y-4">
    </ul>
  </div>
  <script>
    function addTask() {
      const taskInput = document.getElementById('taskInput');
      const taskList = document.getElementById('taskList');
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-white p-4 border-black border-2 rounded-md';
        li.innerHTML = \`
          <div class="flex items-center">
            <input type="checkbox" class="custom-checkbox mr-2">
            <p class="ml-2">\${taskText}</p>
          </div>
          <div class="flex space-x-2">
            <button class="border-black border-2 bg-[#FFA6F6] hover:bg-[#fa8cef] active:bg-[#f774ea] w-10 h-10 rounded-border flex justify-center items-center">
              <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 482.428 482.429" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path> <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path> <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path> <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"></path> </g> </g> </g></svg>
            </button>
          </div>
        \`;
        taskList.appendChild(li);
        taskInput.value = '';
      }
    }
  <\/script>
</body>
</html>
`}}}},"README.md":{file:{contents:"# How to use\nTo clone source code from github\n```bash\ngit clone /gh/{owner}/{repo} ./{folder}\n```\n\nStart HTML server\n\n```bash\nhttp-server\n\n```\n"}},"package.json":{file:{contents:`{
  "dependencies": {
    "http-server": "^14.1.1"
  },
  "scripts": {
    "dev": "http-server"
  }
}
`}},"package-lock.json":{file:{contents:`{
  "name": "k03e2io1v3fx9wvj0vr8qd5q58o56n-fkdo-3snrtvdk",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "dependencies": {
        "http-server": "^14.1.1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/async": {
      "version": "2.6.4",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.4.tgz",
      "integrity": "sha512-mzo5dfJYwAn29PeiJ0zvwTo04zj8HDJj0Mn8TD7sno7q12prdbnasKJHhkm2c1LgrhlJ0teaea8860oxi51mGA==",
      "dependencies": {
        "lodash": "^4.17.14"
      }
    },
    "node_modules/basic-auth": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/basic-auth/-/basic-auth-2.0.1.tgz",
      "integrity": "sha512-NF+epuEdnUYVlGuhaxbbq+dvJttwLnGY+YixlXlME5KpQ5W3CnXA5cVTneY3SPbPDRkcjMbifrwmFYcClgOZeg==",
      "dependencies": {
        "safe-buffer": "5.1.2"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.1.tgz",
      "integrity": "sha512-BhYE+WDaywFg2TBWYNXAE+8B1ATnThNBqXHP5nQu0jWJdVvY2hvkpyB3qOmtmDePiS5/BDQ8wASEWGMWRG148g==",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.3.tgz",
      "integrity": "sha512-YTd+6wGlNlPxSuri7Y6X8tY2dmm12UMH66RpKMhiX6rsk5wXXnYgbUcOt8kiS31/AjfoTOvCsE+w8nZQLQnzHA==",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA=="
    },
    "node_modules/corser": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/corser/-/corser-2.0.1.tgz",
      "integrity": "sha512-utCYNzRSQIZNPIcGZdQc92UVJYAhtGAteCFg0yRaFm8f0P+CPtyGyHXJcGXnffjCybUCEx3FQ2G7U3/o9eIkVQ==",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.0.0.tgz",
      "integrity": "sha512-MZ4iQ6JwHOBQjahnjwaC1ZtIBH+2ohjamzAO3oaHcXYup7qxjF2fixyH+Q71voWHeOkI2q/TnJao/KfXYIZWbw==",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/eventemitter3": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
      "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw=="
    },
    "node_modules/follow-redirects": {
      "version": "1.15.9",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.9.tgz",
      "integrity": "sha512-gew4GsXizNgdoRyqmyfMHyAmXsZDk6mHkSxZFCzW9gwlbtOW44CDtYavM+y+72qD/Vq2l550kMF52DT8fOLJqQ==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.2.6.tgz",
      "integrity": "sha512-qxsEs+9A+u85HhllWJJFicJfPDhRmjzoYdl64aMWW9yRIJmSyxdn8IEkuIM530/7T+lv0TIHd8L6Q/ra0tEoeA==",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "dunder-proto": "^1.0.0",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "function-bind": "^1.1.2",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/he": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/he/-/he-1.2.0.tgz",
      "integrity": "sha512-F/1DnUGPopORZi0ni+CvrCgHQ5FyEAHRLSApuYWMmrbSwoN2Mn/7k+Gl38gJnR7yyDZk6WLXwiGod1JOWNDKGw==",
      "bin": {
        "he": "bin/he"
      }
    },
    "node_modules/html-encoding-sniffer": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-3.0.0.tgz",
      "integrity": "sha512-oWv4T4yJ52iKrufjnyZPkrN0CH3QnrUqdB6In1g5Fe1mia8GmF36gnfNySxoZtxD5+NmYw1EElVXiBk93UeskA==",
      "dependencies": {
        "whatwg-encoding": "^2.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/http-proxy": {
      "version": "1.18.1",
      "resolved": "https://registry.npmjs.org/http-proxy/-/http-proxy-1.18.1.tgz",
      "integrity": "sha512-7mz/721AbnJwIVbnaSv1Cz3Am0ZLT/UBwkC92VlxhXv/k/BBQfM2fXElQNC27BVGr0uwUpplYPQM9LnaBMR5NQ==",
      "dependencies": {
        "eventemitter3": "^4.0.0",
        "follow-redirects": "^1.0.0",
        "requires-port": "^1.0.0"
      },
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/http-server": {
      "version": "14.1.1",
      "resolved": "https://registry.npmjs.org/http-server/-/http-server-14.1.1.tgz",
      "integrity": "sha512-+cbxadF40UXd9T01zUHgA+rlo2Bg1Srer4+B4NwIHdaGxAGGv59nYRnGGDJ9LBk7alpS0US+J+bLLdQOOkJq4A==",
      "dependencies": {
        "basic-auth": "^2.0.1",
        "chalk": "^4.1.2",
        "corser": "^2.0.1",
        "he": "^1.2.0",
        "html-encoding-sniffer": "^3.0.0",
        "http-proxy": "^1.18.1",
        "mime": "^1.6.0",
        "minimist": "^1.2.6",
        "opener": "^1.5.1",
        "portfinder": "^1.0.28",
        "secure-compare": "3.0.1",
        "union": "~0.5.0",
        "url-join": "^4.0.1"
      },
      "bin": {
        "http-server": "bin/http-server"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/mkdirp": {
      "version": "0.5.6",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.6.tgz",
      "integrity": "sha512-FP+p8RB8OWpF3YZBCrP5gtADmtXApB5AMLn+vdyA+PyxCjrCs00mjyUozssO33cwDeT3wNGdLxJ5M//YqtHAJw==",
      "dependencies": {
        "minimist": "^1.2.6"
      },
      "bin": {
        "mkdirp": "bin/cmd.js"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="
    },
    "node_modules/object-inspect": {
      "version": "1.13.3",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.3.tgz",
      "integrity": "sha512-kDCGIbxkDSXE3euJZZXzc6to7fCrKHNI/hSRQnRuQ+BWjFNzZwiFF8fj/6o2t2G9/jTj8PSIYTfCLelLZEeRpA==",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/opener": {
      "version": "1.5.2",
      "resolved": "https://registry.npmjs.org/opener/-/opener-1.5.2.tgz",
      "integrity": "sha512-ur5UIdyw5Y7yEj9wLzhqXiy6GZ3Mwx0yGI+5sMn2r0N0v3cKJvUmFH5yPP+WXh9e0xfyzyJX95D8l088DNFj7A==",
      "bin": {
        "opener": "bin/opener-bin.js"
      }
    },
    "node_modules/portfinder": {
      "version": "1.0.32",
      "resolved": "https://registry.npmjs.org/portfinder/-/portfinder-1.0.32.tgz",
      "integrity": "sha512-on2ZJVVDXRADWE6jnQaX0ioEylzgBpQk8r55NE4wjXW1ZxO+BgDlY6DXwj20i0V8eB4SenDQ00WEaxfiIQPcxg==",
      "dependencies": {
        "async": "^2.6.4",
        "debug": "^3.2.7",
        "mkdirp": "^0.5.6"
      },
      "engines": {
        "node": ">= 0.12.0"
      }
    },
    "node_modules/qs": {
      "version": "6.13.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.13.1.tgz",
      "integrity": "sha512-EJPeIn0CYrGu+hli1xilKAPXODtJ12T0sP63Ijx2/khC2JtuaN3JyNIpvmnkmaEtha9ocbG4A4cMcr+TvqvwQg==",
      "dependencies": {
        "side-channel": "^1.0.6"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/requires-port": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/requires-port/-/requires-port-1.0.0.tgz",
      "integrity": "sha512-KigOCHcocU3XODJxsu8i/j8T9tzT4adHiecwORRQ0ZZFcp7ahwXuRU1m+yuO90C5ZUyGeGfocHDI14M3L3yDAQ=="
    },
    "node_modules/safe-buffer": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",
      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="
    },
    "node_modules/secure-compare": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/secure-compare/-/secure-compare-3.0.1.tgz",
      "integrity": "sha512-AckIIV90rPDcBcglUwXPF3kg0P0qmPsPXAj6BBEENQE1p5yA1xfmDJzfi1Tappj37Pv2mVbKpL3Z1T+Nn7k1Qw=="
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/union": {
      "version": "0.5.0",
      "resolved": "https://registry.npmjs.org/union/-/union-0.5.0.tgz",
      "integrity": "sha512-N6uOhuW6zO95P3Mel2I2zMsbsanvvtgn6jVqJv4vbVcz/JN0OkL9suomjQGmWtxJQXOCqUJvquc1sMeNz/IwlA==",
      "dependencies": {
        "qs": "^6.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/url-join": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/url-join/-/url-join-4.0.1.tgz",
      "integrity": "sha512-jk1+QP6ZJqyOiuEI9AEWQfju/nB2Pw466kbA0LEZljHwKeMgd9WrAEgEGxjPDD2+TNbbb37rTyhEfrCXfuKXnA=="
    },
    "node_modules/whatwg-encoding": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-2.0.0.tgz",
      "integrity": "sha512-p41ogyeMUrw3jWclHWTQg1k05DSVXPLcVxRTYsXUk+ZooOCZLcoYgPZ/HL/D/N+uQPOtcp1me1WhBEaX02mhWg==",
      "dependencies": {
        "iconv-lite": "0.6.3"
      },
      "engines": {
        "node": ">=12"
      }
    }
  }
}
`}}};export{e as BASE};
