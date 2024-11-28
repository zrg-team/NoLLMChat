import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			brand: {
  				DEFAULT: 'hsl(var(--brand))',
  				foreground: 'hsl(var(--brand-foreground))',
					foreground: 'hsl(var(--brand-foreground))',
          hover: 'hsl(var(--brand-hover))',
  			},
  			highlight: {
  				DEFAULT: 'hsl(var(--highlight))',
  				foreground: 'hsl(var(--highlight-foreground))'
  			},
        'subtle-foreground': 'hsl(var(--subtle-foreground))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
				xl: `calc(var(--radius) + 4px)`,
        xs: 'calc(var(--radius) - 6px)',
  		},
			boxShadow: {
        floating: 'rgba(16,16,16,0.06) 0px 0px 0px 1px, rgba(16,16,16,0.11) 0px 3px 7px, rgba(16,16,16,0.21) 0px 9px 25px',
        toolbar: 'rgba(0, 0, 0, 0.08) 0px 16px 24px 0px, rgba(0, 0, 0, 0.1) 0px 2px 6px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
      },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			grid: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			shine: {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			},
  			meteor: {
  				'0%': {
  					transform: 'rotate(215deg) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(215deg) translateX(-500px)',
  					opacity: '0'
  				}
  			},
				'ai-bounce': {
          '0%, 100%': {
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
            transform: 'translateY(20%)',
          },
          '50%': {
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
            transform: 'translateY(-20%)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '80%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '80%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        popover: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 var(--pulse-color)' },
          '50%': { boxShadow: '0 0 0 8px var(--pulse-color)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        shine: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        sunlight: {
          '0%': { transform: 'translateX(-50%) rotate(0deg)' },
          '100%': { transform: 'translateX(0%) rotate(0deg)' },
        },
        zoom: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			grid: 'grid 15s linear infinite',
  			shine: 'shine var(--duration) infinite linear',
  			meteor: 'meteor 5s linear infinite',
        'ai-bounce': 'ai-bounce 0.4s infinite',
        'fade-down': 'fade-down 0.5s',
        'fade-in': 'fade-in 0.4s',
        'fade-out': 'fade-out 0.4s',
        'fade-up': 'fade-up 0.5s',
        popover: 'popover 100ms ease-in',
        pulse: 'pulse var(--duration) ease-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        sunlight: 'sunlight 4s linear infinite',
        zoom: 'zoom 100ms ease-in',
  		},
  		screens: {
  			'main-hover': {
  				raw: '(hover: hover)'
  			}
  		}
  	}
  },
  plugins: [
		require("tailwindcss-animate"),
		require("tailwind-scrollbar-hide"),
		plugin(function ({ addUtilities }) {
      addUtilities({
        '.transition-bg-ease': {
          'transition-duration': '20ms',
          'transition-property': 'background-color',
          'transition-timing-function': 'ease-in',
        },
      });
    }),
	],
}