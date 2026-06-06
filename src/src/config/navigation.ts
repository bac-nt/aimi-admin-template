import {
  Globe, ShoppingCart, Monitor, Sparkles, Users, BookOpen,
  ShoppingBag, MessageSquare, User, StickyNote, Calendar,
  Mail, Ticket, LayoutGrid, Receipt, Package, Settings,
  Key, Shield, DollarSign, HelpCircle, Copy, BarChart3,
  LineChart, Table2, Bot, UserCog, Layers, Tag, Star,
  Image, Search, Percent, CreditCard, Hash,
  type LucideIcon,
} from 'lucide-react'

export interface NavChild { label: string; href: string }
export interface NavItem  { label: string; icon: LucideIcon; href?: string; badge?: string|number; children?: NavChild[] }
export interface NavSection { section: string; items: NavItem[] }

export const NAV_CONFIG: NavSection[] = [
  {
    section: 'DASHBOARDS',
    items: [
      { label: 'Modern',    icon: Globe,       href: '/dashboard/modern', badge: 'New' },
      { label: 'eCommerce', icon: ShoppingCart, href: '/dashboard/ecommerce' },
    ],
  },
  {
    section: 'ECOMMERCE',
    items: [
      { label: 'Catalog', icon: ShoppingBag, children: [
        { label: 'Products',    href: '/apps/ecommerce/list'        },
        { label: 'Add Product', href: '/apps/ecommerce/add-product' },
        { label: 'Categories',  href: '/apps/ecommerce/categories'  },
        { label: 'Attributes',  href: '/apps/ecommerce/attributes'  },
        { label: 'Tags',        href: '/apps/ecommerce/tags'        },
        { label: 'Brands',      href: '/apps/ecommerce/brands'      },
      ]},
      { label: 'Sales', icon: Receipt, children: [
        { label: 'Orders',   href: '/apps/orders'              },
        { label: 'Returns',  href: '/apps/ecommerce/returns'   },
        { label: 'Customers',href: '/apps/customers'           },
        { label: 'Checkout', href: '/apps/ecommerce/checkout'  },
      ]},
      { label: 'Marketing', icon: Percent, children: [
        { label: 'Coupons',     href: '/apps/ecommerce/coupons'    },
        { label: 'Flash Sales', href: '/apps/ecommerce/flash-sales'},
        { label: 'Reviews',     href: '/apps/ecommerce/reviews'    },
      ]},
      { label: 'SEO',  icon: Search, href: '/apps/ecommerce/seo'  },
      { label: 'Shop', icon: Globe,  href: '/apps/ecommerce/shop' },
    ],
  },
  {
    section: 'BLOG & CMS',
    items: [
      { label: 'Posts', icon: BookOpen, children: [
        { label: 'All Posts',   href: '/apps/blog/posts'  },
        { label: 'Create Post', href: '/apps/blog/create' },
        { label: 'Edit Post',   href: '/apps/blog/edit'   },
      ]},
      { label: 'Taxonomy', icon: Hash, children: [
        { label: 'Categories', href: '/apps/blog/categories' },
        { label: 'Tags',       href: '/apps/blog/tags'       },
      ]},
      { label: 'Media',    icon: Image,         href: '/apps/blog/media'    },
      { label: 'Comments', icon: MessageSquare, href: '/apps/blog/comments', badge: 5 },
      { label: 'SEO',      icon: Search,        href: '/apps/blog/seo'      },
    ],
  },
  {
    section: 'COMMUNICATION',
    items: [
      { label: 'Chat',    icon: MessageSquare, href: '/apps/chat'     },
      { label: 'AI Chat', icon: Bot,           href: '/apps/ai-chat'  },
      { label: 'Email',   icon: Mail,          href: '/apps/email'    },
      { label: 'Tickets', icon: Ticket,        href: '/apps/tickets', badge: 3 },
    ],
  },
  {
    section: 'PRODUCTIVITY',
    items: [
      { label: 'Calendar',  icon: Calendar,   href: '/apps/calendar'  },
      { label: 'Kanban',    icon: LayoutGrid, href: '/apps/kanban'    },
      { label: 'Notes',     icon: StickyNote, href: '/apps/notes'     },
      { label: 'Image Gen', icon: Sparkles,   href: '/apps/image-gen' },
    ],
  },
  {
    section: 'USERS & TEAMS',
    items: [
      { label: 'Contacts', icon: Users, href: '/apps/contacts', badge: 2 },
      { label: 'Users', icon: User, children: [
        { label: 'Profile',   href: '/apps/users/profile'   },
        { label: 'Followers', href: '/apps/users/followers' },
        { label: 'Friends',   href: '/apps/users/friends'   },
      ]},
      { label: 'Invoice', icon: Receipt, children: [
        { label: 'List',   href: '/apps/invoice/list'   },
        { label: 'Create', href: '/apps/invoice/create' },
      ]},
    ],
  },
  {
    section: 'PAGES',
    items: [
      { label: 'Frontend', icon: Monitor, children: [
        { label: 'Homepage',  href: '/pages/homepage'  },
        { label: 'About',     href: '/pages/about'     },
        { label: 'Blog',      href: '/pages/blog'      },
        { label: 'Contact',   href: '/pages/contact'   },
        { label: 'Portfolio', href: '/pages/portfolio' },
        { label: 'Pricing',   href: '/pages/pricing'   },
      ]},
      { label: 'Widgets', icon: LayoutGrid, children: [
        { label: 'Cards',   href: '/pages/widgets/cards'   },
        { label: 'Banners', href: '/pages/widgets/banners' },
        { label: 'Charts',  href: '/pages/widgets/charts'  },
      ]},
      { label: 'FAQ',         icon: HelpCircle, href: '/pages/faq'    },
      { label: 'Sample Page', icon: Copy,       href: '/pages/sample' },
    ],
  },
  {
    // ── MERGED: IAM + Role Access + Settings all under one section ──
    section: 'ADMINISTRATION',
    items: [
      {
        label: 'IAM & Access', icon: Shield,
        // Single page: Roles, Permissions, Users, Security, Audit - all in one
        href: '/pages/iam',
      },
      { label: 'Account',      icon: Settings, href: '/pages/account-setting' },
      { label: 'API Keys',     icon: Key,      href: '/pages/api-keys'        },
      { label: 'Integrations', icon: Layers,   href: '/pages/integrations'    },
    ],
  },
  {
    section: 'FORMS',
    items: [
      { label: 'Form Elements', icon: Layers, children: [
        { label: 'Autocomplete', href: '/forms/elements/autocomplete' },
        { label: 'Button',       href: '/forms/elements/button'       },
        { label: 'Checkbox',     href: '/forms/elements/checkbox'     },
        { label: 'Radio',        href: '/forms/elements/radio'        },
        { label: 'Date Time',    href: '/forms/elements/date-time'    },
        { label: 'Slider',       href: '/forms/elements/slider'       },
        { label: 'Switch',       href: '/forms/elements/switch'       },
      ]},
      { label: 'Form Layouts', icon: Copy, children: [
        { label: 'Horizontal', href: '/forms/horizontal' },
        { label: 'Vertical',   href: '/forms/vertical'   },
        { label: 'Wizard',     href: '/forms/wizard'     },
        { label: 'Validation', href: '/forms/validation' },
      ]},
    ],
  },
  {
    section: 'DATA & ANALYTICS',
    items: [
      { label: 'Tables', icon: Table2, children: [
        { label: 'Basic',       href: '/tables/basic'       },
        { label: 'Collapsible', href: '/tables/collapsible' },
        { label: 'Enhanced',    href: '/tables/enhanced'    },
        { label: 'Pagination',  href: '/tables/pagination'  },
        { label: 'Search',      href: '/tables/search'      },
      ]},
      { label: 'Charts', icon: BarChart3, children: [
        { label: 'Line',           href: '/charts/line'     },
        { label: 'Area',           href: '/charts/area'     },
        { label: 'Column',         href: '/charts/column'   },
        { label: 'Doughnut & Pie', href: '/charts/doughnut' },
        { label: 'Radial Bar',     href: '/charts/radial'   },
      ]},
    ],
  },
  { section: 'UI', items: [{ label: 'UI Components', icon: Layers, href: '/ui/components' }] },
]

export const TOPBAR_LINKS = [
  { label: 'Chat',     href: '/apps/chat'     },
  { label: 'Calendar', href: '/apps/calendar' },
  { label: 'Email',    href: '/apps/email'    },
]

export const TOPBAR_APPS = [
  { label: 'Chat',     href: '/apps/chat'           },
  { label: 'Calendar', href: '/apps/calendar'       },
  { label: 'Email',    href: '/apps/email'          },
  { label: 'Contacts', href: '/apps/contacts'       },
  { label: 'Notes',    href: '/apps/notes'          },
  { label: 'Kanban',   href: '/apps/kanban'         },
  { label: 'AI Chat',  href: '/apps/ai-chat'        },
  { label: 'Invoice',  href: '/apps/invoice/list'   },
  { label: 'Blog',     href: '/apps/blog/posts'     },
  { label: 'Shop',     href: '/apps/ecommerce/shop' },
]
