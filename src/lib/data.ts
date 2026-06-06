/**
 * Shared mock data & utilities used across pages
 */

// ─── Currency formatter ────────────────────────────────────────
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency,
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

export function formatDate(d: string | Date): string {
  return new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'numeric' }).format(new Date(d))
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ─── Products ─────────────────────────────────────────────────
export const PRODUCTS = [
  { id:1,  image:'https://picsum.photos/seed/p1/200/200', name:'Nike Air Max 270',           category:'Footwear',     brand:'Nike',    sku:'NK-AM-270',  price:129.99, original:159.99, stock:84,  status:'Active',   rating:4.5, reviews:128, img:'https://picsum.photos/seed/p1/200/200'  },
  { id:2,  name:'MacBook Air M3',              category:'Electronics',  brand:'Apple',   sku:'AP-MBA-M3',  price:1099.00,original:1299.00,stock:12,  status:'Active',   rating:4.9, reviews:342, img:'https://picsum.photos/seed/p2/200/200', image:'https://picsum.photos/seed/p2/200/200'  },
  { id:3,  name:'Sony WH-1000XM5',            category:'Electronics',  brand:'Sony',    sku:'SN-WH-1000', price:279.99, original:349.99, stock:37,  status:'Active',   rating:4.7, reviews:210, img:'https://picsum.photos/seed/p3/200/200', image:'https://picsum.photos/seed/p3/200/200'  },
  { id:4,  name:'Adidas Ultraboost 23',        category:'Footwear',     brand:'Adidas',  sku:'AD-UB-23',   price:159.99, original:189.99, stock:0,   status:'Inactive', rating:4.3, reviews:89,  img:'https://picsum.photos/seed/p4/200/200', image:'https://picsum.photos/seed/p4/200/200'  },
  { id:5,  name:'Organic Cotton T-Shirt',      category:'Clothing',     brand:'EcoWear', sku:'EW-OCT-01',  price:34.99,  original:44.99,  stock:210, status:'Active',   rating:4.2, reviews:56,  img:'https://picsum.photos/seed/p5/200/200', image:'https://picsum.photos/seed/p5/200/200'  },
  { id:6,  name:'Leather Crossbody Bag',       category:'Accessories',  brand:'Fossil',  sku:'FS-LCB-01',  price:89.99,  original:119.99, stock:44,  status:'Active',   rating:4.6, reviews:93,  img:'https://picsum.photos/seed/p6/200/200', image:'https://picsum.photos/seed/p6/200/200'  },
  { id:7,  name:'iPad Pro 12.9"',              category:'Electronics',  brand:'Apple',   sku:'AP-IPD-12',  price:1099.00,original:1199.00,stock:29,  status:'Active',   rating:4.8, reviews:184, img:'https://picsum.photos/seed/p7/200/200', image:'https://picsum.photos/seed/p7/200/200'  },
  { id:8,  name:'Wireless Mechanical Keyboard',category:'Electronics',  brand:'Keychron',sku:'KC-WMK-01',  price:129.99, original:149.99, stock:67,  status:'Active',   rating:4.4, reviews:142, img:'https://picsum.photos/seed/p8/200/200', image:'https://picsum.photos/seed/p8/200/200'  },
  { id:9,  name:'Running Shorts Pro',          category:'Clothing',     brand:'Nike',    sku:'NK-RSP-01',  price:49.99,  original:59.99,  stock:195, status:'Active',   rating:4.1, reviews:47,  img:'https://picsum.photos/seed/p9/200/200', image:'https://picsum.photos/seed/p9/200/200'  },
  { id:10, name:'Stainless Water Bottle',      category:'Accessories',  brand:'Hydro',   sku:'HF-SWB-32',  price:39.99,  original:49.99,  stock:320, status:'Active',   rating:4.5, reviews:278, img:'https://picsum.photos/seed/p10/200/200', image:'https://picsum.photos/seed/p10/200/200' },
  { id:11, name:'Yoga Mat Premium',            category:'Sports',       brand:'Lululemon',sku:'LL-YMP-01',  price:68.00,  original:88.00,  stock:76,  status:'Active',   rating:4.6, reviews:165, img:'https://picsum.photos/seed/p11/200/200', image:'https://picsum.photos/seed/p11/200/200' },
  { id:12, name:'Denim Jacket Vintage',        category:'Clothing',     brand:'Levi\'s', sku:'LV-DJV-01',  price:79.99,  original:99.99,  stock:0,   status:'Inactive', rating:4.0, reviews:31,  img:'https://picsum.photos/seed/p12/200/200', image:'https://picsum.photos/seed/p12/200/200' },
]

// ─── Categories ───────────────────────────────────────────────
export const ECOM_CATEGORIES = [
  { id:1, name:'Electronics',  slug:'electronics',  parent:null,        count:48, status:'Active',   icon:'💻' },
  { id:2, name:'Footwear',     slug:'footwear',      parent:null,        count:32, status:'Active',   icon:'👟' },
  { id:3, name:'Clothing',     slug:'clothing',      parent:null,        count:127,status:'Active',   icon:'👕' },
  { id:4, name:'Accessories',  slug:'accessories',   parent:null,        count:64, status:'Active',   icon:'👜' },
  { id:5, name:'Sports',       slug:'sports',        parent:null,        count:29, status:'Active',   icon:'⚽' },
  { id:6, name:'Smartphones',  slug:'smartphones',   parent:'Electronics',count:18, status:'Active',  icon:'📱' },
  { id:7, name:'Laptops',      slug:'laptops',       parent:'Electronics',count:12, status:'Active',  icon:'💻' },
  { id:8, name:'Running',      slug:'running',       parent:'Footwear',  count:14, status:'Active',   icon:'🏃' },
  { id:9, name:'Dresses',      slug:'dresses',       parent:'Clothing',  count:38, status:'Draft',    icon:'👗' },
  { id:10,name:'Watches',      slug:'watches',       parent:'Accessories',count:22,status:'Active',   icon:'⌚' },
]

// ─── Orders ───────────────────────────────────────────────────
export const ORDERS = [
  { id:'#ORD-7841', customer:'Sarah Johnson',   email:'sarah@email.com',   items:3, total:289.97, status:'Delivered',  date:'Mar 20, 2025', payment:'Visa ••4242',   city:'New York'     },
  { id:'#ORD-7840', customer:'Michael Chen',    email:'mchen@email.com',   items:1, total:1099.00,status:'Processing', date:'Mar 20, 2025', payment:'Mastercard',    city:'San Francisco'},
  { id:'#ORD-7839', customer:'Emma Wilson',     email:'ewilson@email.com', items:5, total:184.95, status:'Shipped',    date:'Mar 19, 2025', payment:'PayPal',        city:'Chicago'      },
  { id:'#ORD-7838', customer:'James Murphy',    email:'jmurphy@email.com', items:2, total:209.98, status:'Pending',    date:'Mar 19, 2025', payment:'Visa ••1234',   city:'Boston'       },
  { id:'#ORD-7837', customer:'Anna Rodriguez',  email:'anna@email.com',    items:1, total:68.00,  status:'Cancelled',  date:'Mar 18, 2025', payment:'Stripe',        city:'Miami'        },
  { id:'#ORD-7836', customer:'David Park',      email:'dpark@email.com',   items:4, total:399.96, status:'Delivered',  date:'Mar 18, 2025', payment:'Apple Pay',     city:'Seattle'      },
  { id:'#ORD-7835', customer:'Lisa Thompson',   email:'lisa@email.com',    items:2, total:159.98, status:'Delivered',  date:'Mar 17, 2025', payment:'Visa ••5678',   city:'Denver'       },
  { id:'#ORD-7834', customer:'Tom Williams',    email:'tomw@email.com',    items:6, total:522.94, status:'Processing', date:'Mar 17, 2025', payment:'Mastercard',    city:'Austin'       },
  { id:'#ORD-7833', customer:'Priya Sharma',    email:'priya@email.com',   items:1, total:279.99, status:'Shipped',    date:'Mar 16, 2025', payment:'PayPal',        city:'Houston'      },
  { id:'#ORD-7832', customer:'Chris Brown',     email:'cbrown@email.com',  items:3, total:139.97, status:'Delivered',  date:'Mar 16, 2025', payment:'Visa ••9012',   city:'Phoenix'      },
]

// ─── Customers ────────────────────────────────────────────────
export const CUSTOMERS = [
  { id:1,  name:'Sarah Johnson',   email:'sarah@email.com',   phone:'+1 555-0101', city:'New York',      orders:12, spent:1847.50,  status:'Active',    since:'Jan 2023', tier:'Gold'     },
  { id:2,  name:'Michael Chen',    email:'mchen@email.com',   phone:'+1 555-0102', city:'San Francisco', orders:8,  spent:3204.00,  status:'Active',    since:'Mar 2023', tier:'Platinum' },
  { id:3,  name:'Emma Wilson',     email:'ewilson@email.com', phone:'+1 555-0103', city:'Chicago',       orders:24, spent:892.40,   status:'Active',    since:'Nov 2022', tier:'Silver'   },
  { id:4,  name:'James Murphy',    email:'jmurphy@email.com', phone:'+1 555-0104', city:'Boston',        orders:3,  spent:419.97,   status:'Active',    since:'Feb 2024', tier:'Bronze'   },
  { id:5,  name:'Anna Rodriguez',  email:'anna@email.com',    phone:'+1 555-0105', city:'Miami',         orders:0,  spent:0,        status:'Inactive',  since:'Mar 2024', tier:'Bronze'   },
  { id:6,  name:'David Park',      email:'dpark@email.com',   phone:'+1 555-0106', city:'Seattle',       orders:19, spent:5621.80,  status:'Active',    since:'Jun 2022', tier:'Platinum' },
  { id:7,  name:'Lisa Thompson',   email:'lisa@email.com',    phone:'+1 555-0107', city:'Denver',        orders:7,  spent:678.86,   status:'Active',    since:'Aug 2023', tier:'Silver'   },
  { id:8,  name:'Tom Williams',    email:'tomw@email.com',    phone:'+1 555-0108', city:'Austin',        orders:31, spent:2341.12,  status:'Active',    since:'Apr 2022', tier:'Gold'     },
  { id:9,  name:'Priya Sharma',    email:'priya@email.com',   phone:'+1 555-0109', city:'Houston',       orders:5,  spent:979.95,   status:'Active',    since:'Dec 2023', tier:'Bronze'   },
  { id:10, name:'Chris Brown',     email:'cbrown@email.com',  phone:'+1 555-0110', city:'Phoenix',       orders:15, spent:1234.55,  status:'Suspended', since:'Sep 2023', tier:'Silver'   },
]

// ─── Reviews ──────────────────────────────────────────────────
export const REVIEWS = [
  { id:1,  product:'Nike Air Max 270',     customer:'Sarah J.',   rating:5, title:'Perfect fit!',            body:'Incredibly comfortable, great for all-day wear.',  status:'Approved', date:'Mar 15', helpful:24, verified:true  },
  { id:2,  product:'MacBook Air M3',       customer:'Michael C.', rating:5, title:'Best laptop ever',        body:'Blazing fast, incredible battery life.',           status:'Approved', date:'Mar 14', helpful:48, verified:true  },
  { id:3,  product:'Sony WH-1000XM5',      customer:'Emma W.',    rating:4, title:'Great ANC headphones',    body:'Sound quality is exceptional. ANC works perfectly.',status:'Approved', date:'Mar 13', helpful:18, verified:true  },
  { id:4,  product:'Adidas Ultraboost 23', customer:'James M.',   rating:2, title:'Sizing runs small',       body:'Had to return and size up. Not as expected.',       status:'Pending',  date:'Mar 12', helpful:7,  verified:false },
  { id:5,  product:'Organic Cotton Tee',   customer:'Anna R.',    rating:3, title:'Average quality',         body:'Fabric is decent but not exceptional.',             status:'Approved', date:'Mar 11', helpful:4,  verified:true  },
  { id:6,  product:'Leather Crossbody',    customer:'David P.',   rating:5, title:'Stunning bag!',           body:'Beautiful quality. Exactly as described.',          status:'Approved', date:'Mar 10', helpful:31, verified:true  },
  { id:7,  product:'iPad Pro 12.9"',       customer:'Lisa T.',    rating:5, title:'Worth every penny',       body:'Incredible for drawing and creative work.',         status:'Approved', date:'Mar 9',  helpful:42, verified:true  },
  { id:8,  product:'Keychron Keyboard',    customer:'Tom W.',     rating:1, title:'DOA unit',                body:'Dead on arrival. Keys not responding.',             status:'Pending',  date:'Mar 8',  helpful:15, verified:true  },
]

// ─── Coupons ──────────────────────────────────────────────────
export const COUPONS = [
  { id:1,  code:'SUMMER25',  type:'Percent',  value:25,  minOrder:50,   uses:142, limit:500,  status:'Active',   expires:'Jun 30, 2025' },
  { id:2,  code:'FLAT10',    type:'Fixed',    value:10,  minOrder:30,   uses:89,  limit:200,  status:'Active',   expires:'Apr 15, 2025' },
  { id:3,  code:'NEWUSER50', type:'Percent',  value:50,  minOrder:100,  uses:38,  limit:100,  status:'Active',   expires:'Dec 31, 2025' },
  { id:4,  code:'FREESHIP',  type:'Shipping', value:0,   minOrder:75,   uses:204, limit:1000, status:'Active',   expires:'Mar 31, 2025' },
  { id:5,  code:'FLASH20',   type:'Percent',  value:20,  minOrder:0,    uses:500, limit:500,  status:'Expired',  expires:'Feb 28, 2025' },
  { id:6,  code:'VIP100',    type:'Fixed',    value:100, minOrder:500,  uses:12,  limit:50,   status:'Active',   expires:'Dec 31, 2025' },
]

// ─── Blog data ─────────────────────────────────────────────────
export const BLOG_POSTS = [
  { id:1,  title:'Getting Started with Next.js 15',      cat:'Development', author:'Mathew',  date:'Jan 15, 2025', views:4200, likes:128, comments:24, status:'Published', img:'https://picsum.photos/seed/b1/400/240', tags:['nextjs','react'] },
  { id:2,  title:'Tailwind CSS Best Practices in 2025',  cat:'Design',      author:'Nirav',   date:'Jan 18, 2025', views:3100, likes:96,  comments:18, status:'Published', img:'https://picsum.photos/seed/b2/400/240', tags:['css','tailwind']  },
  { id:3,  title:'Building Scalable React Applications', cat:'Development', author:'Bhavesh', date:'Jan 22, 2025', views:5600, likes:210, comments:41, status:'Published', img:'https://picsum.photos/seed/b3/400/240', tags:['react','patterns'] },
  { id:4,  title:'UI/UX Design Trends 2025',             cat:'Design',      author:'Lara',    date:'Jan 25, 2025', views:2800, likes:87,  comments:15, status:'Draft',     img:'https://picsum.photos/seed/b4/400/240', tags:['design','ux']     },
  { id:5,  title:'TypeScript for React Developers',      cat:'Development', author:'Andrew',  date:'Jan 28, 2025', views:6100, likes:243, comments:52, status:'Published', img:'https://picsum.photos/seed/b5/400/240', tags:['typescript','react'] },
  { id:6,  title:'Docker & Kubernetes for Beginners',    cat:'DevOps',      author:'Sunil',   date:'Feb 1, 2025',  views:3900, likes:145, comments:33, status:'Published', img:'https://picsum.photos/seed/b6/400/240', tags:['docker','devops'] },
]

export const BLOG_CATEGORIES = [
  { id:1, name:'Development', slug:'development', count:24, color:'#5d87ff', parent:null  },
  { id:2, name:'Design',      slug:'design',      count:18, color:'#7c3aed', parent:null  },
  { id:3, name:'DevOps',      slug:'devops',      count:11, color:'#49beff', parent:null  },
  { id:4, name:'Tutorial',    slug:'tutorial',    count:32, color:'#ffae1f', parent:null  },
  { id:5, name:'News',        slug:'news',        count:9,  color:'#13deb9', parent:null  },
  { id:6, name:'React',       slug:'react',       count:15, color:'#5d87ff', parent:'Development' },
  { id:7, name:'CSS',         slug:'css',         count:8,  color:'#7c3aed', parent:'Design' },
]

export const BLOG_TAGS = [
  { id:1,  name:'nextjs',     slug:'nextjs',     count:12, trending:true  },
  { id:2,  name:'react',      slug:'react',      count:28, trending:true  },
  { id:3,  name:'typescript', slug:'typescript', count:19, trending:false },
  { id:4,  name:'tailwind',   slug:'tailwind',   count:14, trending:true  },
  { id:5,  name:'docker',     slug:'docker',     count:8,  trending:false },
  { id:6,  name:'css',        slug:'css',        count:11, trending:false },
  { id:7,  name:'devops',     slug:'devops',     count:6,  trending:false },
  { id:8,  name:'ux',         slug:'ux',         count:9,  trending:false },
  { id:9,  name:'api',        slug:'api',        count:7,  trending:false },
  { id:10, name:'performance',slug:'performance',count:5,  trending:true  },
]

// ─── Media ─────────────────────────────────────────────────────
export const MEDIA_FILES = [
  { id:1,  name:'hero-banner.jpg',       type:'image', size:'2.4 MB', dims:'1920×600', url:'https://picsum.photos/seed/m1/300/200',  date:'Mar 20' },
  { id:2,  name:'product-nike.png',      type:'image', size:'890 KB', dims:'800×800',  url:'https://picsum.photos/seed/m2/300/300',  date:'Mar 19' },
  { id:3,  name:'team-photo.jpg',        type:'image', size:'3.1 MB', dims:'2400×1600',url:'https://picsum.photos/seed/m3/300/200',  date:'Mar 18' },
  { id:4,  name:'blog-cover-1.jpg',      type:'image', size:'1.2 MB', dims:'1200×628', url:'https://picsum.photos/seed/m4/300/200',  date:'Mar 17' },
  { id:5,  name:'product-apple.png',     type:'image', size:'650 KB', dims:'600×600',  url:'https://picsum.photos/seed/m5/300/300',  date:'Mar 16' },
  { id:6,  name:'intro-video.mp4',       type:'video', size:'48 MB',  dims:'1920×1080',url:'',                                       date:'Mar 15' },
  { id:7,  name:'product-catalog.pdf',   type:'pdf',   size:'5.2 MB', dims:'—',        url:'',                                       date:'Mar 14' },
  { id:8,  name:'brand-logo.svg',        type:'image', size:'12 KB',  dims:'400×120',  url:'https://picsum.photos/seed/m8/300/100',  date:'Mar 13' },
  { id:9,  name:'icon-set.zip',          type:'zip',   size:'890 KB', dims:'—',        url:'',                                       date:'Mar 12' },
  { id:10, name:'favicon.ico',           type:'image', size:'4 KB',   dims:'32×32',    url:'https://picsum.photos/seed/m10/100/100', date:'Mar 11' },
  { id:11, name:'about-banner.jpg',      type:'image', size:'1.8 MB', dims:'1600×900', url:'https://picsum.photos/seed/m11/300/200', date:'Mar 10' },
  { id:12, name:'data-export.xlsx',      type:'excel', size:'320 KB', dims:'—',        url:'',                                       date:'Mar 9'  },
]

// ─── Recent Transactions (for dashboard) ──────────────────────
export const RECENT_TRANSACTIONS = [
  { id:'#TXN-001', customer:'Sarah Johnson',  product:'MacBook Air M3',        amount:1099.00, date:'Mar 20, 2025', status:'Completed', avatar:'SJ' },
  { id:'#TXN-002', customer:'Michael Chen',   product:'Sony WH-1000XM5',       amount:279.99,  date:'Mar 20, 2025', status:'Completed', avatar:'MC' },
  { id:'#TXN-003', customer:'Emma Wilson',    product:'Nike Air Max 270',       amount:129.99,  date:'Mar 19, 2025', status:'Pending',   avatar:'EW' },
  { id:'#TXN-004', customer:'James Murphy',   product:'Leather Crossbody Bag',  amount:89.99,   date:'Mar 19, 2025', status:'Completed', avatar:'JM' },
  { id:'#TXN-005', customer:'Anna Rodriguez', product:'Yoga Mat Premium',       amount:68.00,   date:'Mar 18, 2025', status:'Cancelled', avatar:'AR' },
  { id:'#TXN-006', customer:'David Park',     product:'iPad Pro 12.9"',         amount:1099.00, date:'Mar 18, 2025', status:'Completed', avatar:'DP' },
  { id:'#TXN-007', customer:'Lisa Thompson',  product:'Stainless Water Bottle', amount:39.99,   date:'Mar 17, 2025', status:'Pending',   avatar:'LT' },
]

// ─── Chat data ─────────────────────────────────────────────────
export const CHAT_CONTACTS = [
  { id:1,  name:'Andrew McDown',  role:'Project Manager',  status:'online',  avatar:'AM', unread:3,  lastMsg:'Can you review the latest mockups?',       time:'10:32 AM' },
  { id:2,  name:'Nirav Joshi',    role:'Frontend Dev',     status:'online',  avatar:'NJ', unread:0,  lastMsg:'The build is passing now 🎉',                time:'9:45 AM'  },
  { id:3,  name:'Bhavesh Patel',  role:'Backend Dev',      status:'away',    avatar:'BP', unread:1,  lastMsg:'API docs updated, check Notion',            time:'Yesterday'},
  { id:4,  name:'Lara Croft',     role:'UI/UX Designer',   status:'online',  avatar:'LC', unread:0,  lastMsg:'Figma file shared with the team',           time:'Yesterday'},
  { id:5,  name:'Sofia Martinez', role:'Marketing',        status:'offline', avatar:'SM', unread:0,  lastMsg:'Campaign goes live Monday',                 time:'Mon'      },
  { id:6,  name:'David Park',     role:'DevOps',           status:'online',  avatar:'DP', unread:0,  lastMsg:'Deployed to staging ✅',                     time:'Mon'      },
  { id:7,  name:'Tom Williams',   role:'QA Engineer',      status:'away',    avatar:'TW', unread:2,  lastMsg:'Found 3 bugs in the checkout flow',         time:'Sun'      },
]

export const INITIAL_MESSAGES = [
  { id:1,  from:'Andrew McDown',  avatar:'AM', text:'Hey! Can you review the latest mockups I shared in Figma?', time:'10:15 AM', self:false, read:true  },
  { id:2,  from:'me',             avatar:'MA', text:'Sure! Give me a few minutes to look them over.',            time:'10:17 AM', self:true,  read:true  },
  { id:3,  from:'Andrew McDown',  avatar:'AM', text:'Take your time. I also added some new components for the dashboard.',time:'10:18 AM',self:false,read:true},
  { id:4,  from:'me',             avatar:'MA', text:'Looks great! The card layout is much cleaner now. I especially like the new chart widgets.',time:'10:25 AM',self:true,read:true},
  { id:5,  from:'Andrew McDown',  avatar:'AM', text:'Thanks! Can you review the latest mockups? I want to get your sign-off before the standup.', time:'10:32 AM', self:false, read:false },
]

// ─── Emails ────────────────────────────────────────────────────
export const EMAILS = [
  { id:1,  from:'Sarah Johnson',   email:'sarah@email.com',   subject:'Q1 Revenue Report — Final Numbers',             preview:'Please find attached the final Q1 revenue report. Overall we exceeded targets by 12%...',                       date:'10:32 AM', read:false, starred:true,  folder:'inbox',  avatar:'SJ', hasAttachment:true,  labels:['work','finance'] },
  { id:2,  from:'GitHub',          email:'noreply@github.com',subject:'[aimi] Pull request merged: feat/dark-mode',preview:'Pull request #142 was merged into main by @nirav. Dark mode implementation complete...',                     date:'9:15 AM',  read:false, starred:false, folder:'inbox',  avatar:'GH', hasAttachment:false, labels:['dev'] },
  { id:3,  from:'Andrew McDown',   email:'andrew@pm.com',     subject:'Sprint planning tomorrow — agenda attached',     preview:'Hi team, sprint planning is scheduled for 10am tomorrow. I\'ve attached the agenda...',                       date:'Yesterday',read:true,  starred:true,  folder:'inbox',  avatar:'AM', hasAttachment:true,  labels:['work'] },
  { id:4,  from:'Stripe',          email:'billing@stripe.com',subject:'Your invoice for March 2025',                   preview:'Your invoice for $299.00 is now available. Payment will be charged on April 1st...',                         date:'Mar 19',   read:true,  starred:false, folder:'inbox',  avatar:'ST', hasAttachment:true,  labels:['billing'] },
  { id:5,  from:'Nirav Joshi',     email:'nirav@dev.com',     subject:'Re: API rate limits — need your input',         preview:'I\'ve reviewed the rate limiting issue. The problem is in the middleware layer, not the DB...',                date:'Mar 18',   read:true,  starred:false, folder:'inbox',  avatar:'NJ', hasAttachment:false, labels:['dev'] },
  { id:6,  from:'Lara Croft',      email:'lara@design.io',    subject:'New Figma designs ready for review',            preview:'Hey! I\'ve uploaded the new dashboard designs to Figma. Lots of improvements to the sidebar...',               date:'Mar 17',   read:true,  starred:true,  folder:'inbox',  avatar:'LC', hasAttachment:false, labels:['design'] },
  { id:7,  from:'Google Analytics',email:'analytics@google.com',subject:'Your March 2025 site report is ready',       preview:'Your website had 48,291 sessions in March 2025, a 18% increase from last month...',                           date:'Mar 15',   read:true,  starred:false, folder:'inbox',  avatar:'GA', hasAttachment:false, labels:['marketing'] },
  { id:8,  from:'me',              email:'admin@aimi.com',subject:'Server maintenance window — March 28',         preview:'This is a reminder that we have scheduled maintenance this Saturday from 2-4am UTC...',                        date:'Mar 14',   read:true,  starred:false, folder:'sent',   avatar:'MA', hasAttachment:false, labels:[] },
  { id:9,  from:'Tom Williams',    email:'tomw@email.com',     subject:'Bug report: checkout flow broken on mobile',   preview:'Found a critical bug on iOS Safari. The checkout button is not responding after adding items...',              date:'Mar 13',   read:true,  starred:false, folder:'inbox',  avatar:'TW', hasAttachment:true,  labels:['dev','urgent'] },
  { id:10, from:'Sofia Martinez',  email:'sofia@growth.io',   subject:'Campaign results — exceeded all KPIs! 🎉',      preview:'Amazing news! The March campaign exceeded every KPI. Open rate was 42%, CTR was 8.3%...',                      date:'Mar 12',   read:true,  starred:false, folder:'inbox',  avatar:'SM', hasAttachment:true,  labels:['marketing'] },
]

// ─── Contacts ──────────────────────────────────────────────────
export const CONTACTS = [
  { id:1,  name:'Sarah Johnson',   email:'sarah@email.com',   phone:'+1 555-0101', company:'TechCorp',    role:'Product Manager',  city:'New York',      country:'USA',     avatar:'SJ', status:'active',   tags:['client','vip']     },
  { id:2,  name:'Michael Chen',    email:'mchen@email.com',   phone:'+1 555-0102', company:'DesignHub',   role:'UI Designer',      city:'San Francisco', country:'USA',     avatar:'MC', status:'active',   tags:['partner']          },
  { id:3,  name:'Emma Wilson',     email:'ewilson@email.com', phone:'+1 555-0103', company:'StartupX',    role:'CEO',              city:'Chicago',       country:'USA',     avatar:'EW', status:'active',   tags:['client','lead']    },
  { id:4,  name:'James Murphy',    email:'jmurphy@email.com', phone:'+1 555-0104', company:'CloudSoft',   role:'Backend Engineer', city:'Boston',        country:'USA',     avatar:'JM', status:'inactive', tags:['team']             },
  { id:5,  name:'Anna Rodriguez',  email:'anna@email.com',    phone:'+1 555-0105', company:'GrowthLab',   role:'Marketing Lead',   city:'Miami',         country:'USA',     avatar:'AR', status:'active',   tags:['partner','lead']   },
  { id:6,  name:'David Park',      email:'dpark@email.com',   phone:'+1 555-0106', company:'DevOps Inc',  role:'DevOps Engineer',  city:'Seattle',       country:'USA',     avatar:'DP', status:'active',   tags:['team']             },
  { id:7,  name:'Nirav Joshi',     email:'nirav@dev.com',     phone:'+91 98765-0001',company:'Aimi', role:'Frontend Dev',     city:'Mumbai',        country:'India',   avatar:'NJ', status:'active',   tags:['team','vip']       },
  { id:8,  name:'Bhavesh Patel',   email:'b.patel@web.com',   phone:'+91 98765-0002',company:'Aimi', role:'Backend Dev',     city:'Ahmedabad',     country:'India',   avatar:'BP', status:'active',   tags:['team']             },
  { id:9,  name:'Lara Croft',      email:'lara@design.io',    phone:'+44 20 7946-0101',company:'DesignIO','role':'Art Director',  city:'London',        country:'UK',      avatar:'LC', status:'active',   tags:['client','design']  },
  { id:10, name:'Tom Williams',    email:'tomw@email.com',    phone:'+1 555-0108', company:'QA Labs',     role:'QA Engineer',      city:'Austin',        country:'USA',     avatar:'TW', status:'active',   tags:['team']             },
]

// ─── Tickets / Support ─────────────────────────────────────────
export const TICKETS = [
  { id:'TKT-001', subject:'Cannot login after password reset',    customer:'Sarah Johnson',  email:'sarah@email.com',   priority:'urgent', status:'open',        category:'Auth',     created:'Mar 20',  updated:'10m ago',   assignee:'Nirav J.',   messages:3  },
  { id:'TKT-002', subject:'Checkout page crashes on iOS Safari',  customer:'Tom Williams',   email:'tomw@email.com',    priority:'high',   status:'in-progress', category:'Bug',      created:'Mar 19',  updated:'1h ago',    assignee:'Bhavesh P.', messages:7  },
  { id:'TKT-003', subject:'How do I apply a coupon code?',        customer:'Emma Wilson',    email:'ewilson@email.com', priority:'low',    status:'resolved',    category:'Billing',  created:'Mar 18',  updated:'Yesterday', assignee:'Lara C.',    messages:4  },
  { id:'TKT-004', subject:'Product images not loading',           customer:'David Park',     email:'dpark@email.com',   priority:'medium', status:'open',        category:'Bug',      created:'Mar 18',  updated:'2h ago',    assignee:'Unassigned', messages:1  },
  { id:'TKT-005', subject:'Request for bulk discount pricing',    customer:'James Murphy',   email:'jmurphy@email.com', priority:'medium', status:'open',        category:'Sales',    created:'Mar 17',  updated:'3h ago',    assignee:'Andrew M.',  messages:2  },
  { id:'TKT-006', subject:'Invoice not received after payment',   customer:'Anna Rodriguez', email:'anna@email.com',    priority:'high',   status:'in-progress', category:'Billing',  created:'Mar 16',  updated:'Yesterday', assignee:'Sofia M.',   messages:5  },
  { id:'TKT-007', subject:'API rate limit too low for our plan',  customer:'Michael Chen',   email:'mchen@email.com',   priority:'medium', status:'resolved',    category:'API',      created:'Mar 15',  updated:'Mar 16',    assignee:'Nirav J.',   messages:8  },
]

// ─── Invoices ──────────────────────────────────────────────────
export const INVOICES = [
  { id:'INV-2025-001', client:'Sarah Johnson', customer:'Sarah Johnson',  email:'sarah@email.com',   items:[{name:'Pro Plan × 1',qty:1,price:99},{name:'Add-on Storage',qty:2,price:15}],    subtotal:129, tax:10.97, total:139.97, status:'Paid',    date:'Mar 15, 2025', due:'Mar 15, 2025' },
  { id:'INV-2025-002', client:'Michael Chen', customer:'Michael Chen',   email:'mchen@email.com',   items:[{name:'Enterprise Plan',qty:1,price:299},{name:'Setup Fee',qty:1,price:49}],      subtotal:348, tax:29.58, total:377.58, status:'Paid',    date:'Mar 10, 2025', due:'Mar 10, 2025' },
  { id:'INV-2025-003', client:'Emma Wilson', customer:'Emma Wilson',    email:'ewilson@email.com', items:[{name:'Starter Plan',qty:1,price:29}],                                            subtotal:29,  tax:2.47,  total:31.47,  status:'Pending', date:'Mar 20, 2025', due:'Apr 3, 2025'  },
  { id:'INV-2025-004', client:'James Murphy', customer:'James Murphy',   email:'jmurphy@email.com', items:[{name:'Pro Plan × 3 months',qty:3,price:99}],                                    subtotal:297, tax:25.25, total:322.25, status:'Overdue',  date:'Feb 28, 2025', due:'Mar 14, 2025' },
  { id:'INV-2025-005', client:'TechCorp Ltd', customer:'TechCorp Ltd',   email:'billing@techcorp.com',items:[{name:'Enterprise Plan',qty:1,price:299},{name:'Premium Support',qty:1,price:99},{name:'API Access',qty:1,price:49}],subtotal:447,tax:38,total:485,status:'Paid',date:'Mar 1, 2025',due:'Mar 1, 2025'},
  { id:'INV-2025-006', client:'Anna Rodriguez', customer:'Anna Rodriguez', email:'anna@email.com',    items:[{name:'Pro Plan',qty:1,price:99}],                                               subtotal:99,  tax:8.42,  total:107.42, status:'Draft',   date:'Mar 25, 2025', due:'Apr 8, 2025'  },
]

// ─── Calendar Events ───────────────────────────────────────────
export const CALENDAR_EVENTS = [
  { id:1,  title:'Team Standup',          start:'2025-03-28T09:00',end:'2025-03-28T09:30',color:'var(--primary)',   type:'meeting',   desc:'Daily sync with dev team',           recurring:true  },
  { id:2,  title:'Sprint Planning',       start:'2025-03-28T10:00',end:'2025-03-28T12:00',color:'var(--secondary)', type:'meeting',   desc:'Plan tasks for Sprint 24',            recurring:false },
  { id:3,  title:'Product Demo',          start:'2025-03-29T14:00',end:'2025-03-29T15:00',color:'var(--success)',   type:'event',     desc:'Demo for TechCorp stakeholders',      recurring:false },
  { id:4,  title:'Design Review',         start:'2025-03-31T11:00',end:'2025-03-31T12:00',color:'var(--purple)',    type:'meeting',   desc:'Review new dashboard designs',        recurring:false },
  { id:5,  title:'Q1 Review',             start:'2025-04-01T09:00',end:'2025-04-01T17:00',color:'var(--warning)',   type:'event',     desc:'Quarterly business review',           recurring:false },
  { id:6,  title:'Lunch — Nirav',         start:'2025-03-28T12:30',end:'2025-03-28T13:30',color:'var(--success)',   type:'personal',  desc:'Catch up at Blue Bottle Coffee',     recurring:false },
  { id:7,  title:'Server Maintenance',    start:'2025-03-29T02:00',end:'2025-03-29T04:00',color:'var(--error)',     type:'task',      desc:'Scheduled downtime for upgrades',    recurring:false },
]

// ─── Notes ─────────────────────────────────────────────────────
export const NOTES = [
  { id:1,  title:'Q1 Goals & OKRs',          content:'1. Launch new dashboard v2\n2. Reach $500k MRR\n3. Hire 3 senior engineers\n4. Reduce churn to below 3%',             color:'#fef9c3', pinned:true,  tags:['work','planning'], date:'Mar 20' },
  { id:2,  title:'Meeting Notes — Sprint 24',content:'Discussed new feature requests from TechCorp. Need to prioritize API rate limit increase. Sarah will handle the client comms.',color:'#dbeafe',pinned:true, tags:['work','sprint'],  date:'Mar 19' },
  { id:3,  title:'Book recommendations',     content:'- Atomic Habits (James Clear)\n- The Lean Startup\n- Zero to One\n- Deep Work (Cal Newport)',                            color:'#dcfce7', pinned:false, tags:['personal'],        date:'Mar 18' },
  { id:4,  title:'Ideas for new features',   content:'- AI-powered product descriptions\n- Smart inventory alerts\n- Customer lifetime value dashboard\n- Bulk CSV import',      color:'#fce7f3', pinned:false, tags:['work','ideas'],    date:'Mar 15' },
  { id:5,  title:'Server setup checklist',   content:'[x] Configure nginx\n[x] Set up SSL\n[ ] Configure Redis cluster\n[ ] Set up monitoring\n[ ] Load testing',               color:'#f3e8ff', pinned:false, tags:['dev'],             date:'Mar 12' },
]

// ─── Kanban ────────────────────────────────────────────────────
export const KANBAN_COLUMNS = [
  { id:'todo',       title:'To Do',      color:'var(--muted)',     items:[
    { id:'k1', title:'Set up CI/CD pipeline',           priority:'high',   assignee:'NJ', tags:['dev'],     desc:'Configure GitHub Actions for automated deployment' },
    { id:'k2', title:'Write API documentation',         priority:'medium', assignee:'BP', tags:['docs'],    desc:'Document all REST endpoints in Swagger' },
    { id:'k3', title:'Design new onboarding flow',      priority:'low',    assignee:'LC', tags:['design'],  desc:'Create user-friendly onboarding experience' },
  ]},
  { id:'inprogress', title:'In Progress', color:'var(--primary)',   items:[
    { id:'k4', title:'Dashboard dark mode',             priority:'high',   assignee:'NJ', tags:['dev','ui'],desc:'Implement dark mode across all dashboard pages' },
    { id:'k5', title:'Mobile responsive fixes',         priority:'medium', assignee:'LC', tags:['design'],  desc:'Fix layout issues on tablet and mobile devices' },
  ]},
  { id:'review',     title:'In Review',   color:'var(--warning)',   items:[
    { id:'k6', title:'Performance optimization',        priority:'high',   assignee:'BP', tags:['dev'],     desc:'Reduce bundle size and improve load times' },
    { id:'k7', title:'Accessibility audit',             priority:'medium', assignee:'TW', tags:['qa'],      desc:'Ensure WCAG 2.1 AA compliance' },
  ]},
  { id:'done',       title:'Done',        color:'var(--success)',   items:[
    { id:'k8', title:'User authentication flow',        priority:'high',   assignee:'NJ', tags:['dev'],     desc:'JWT auth with refresh tokens — completed' },
    { id:'k9', title:'Product image optimization',      priority:'low',    assignee:'LC', tags:['design'],  desc:'WebP conversion and lazy loading — completed' },
  ]},
]

// ─── User profile ──────────────────────────────────────────────
export const USER_PROFILE = {
  name:      'Mathew Anderson',
  username:  'mathew.anderson',
  email:     'admin@aimi.com',
  phone:     '+1 555-0100',
  role:      'Super Admin',
  bio:       'Senior full-stack engineer and product enthusiast. Building Aimi admin dashboard. Open to interesting collaborations.',
  location:  'San Francisco, CA',
  website:   'https://aimi.com',
  joined:    'January 2023',
  avatar:    'MA',
  followers: 1248,
  following: 342,
  posts:     87,
  skills:    ['React','Next.js','TypeScript','Go','PostgreSQL','Redis','Figma'],
  social:    { twitter:'@mathew_dev', github:'mathew-anderson', linkedin:'mathew-anderson' },
}

// ─── Dashboard stats ───────────────────────────────────────────
export const DASHBOARD_STATS = {
  revenue:      { value: 65432, prev: 55450, change: 18   },
  orders:       { value: 1284,  prev: 1100,  change: 16.7 },
  customers:    { value: 9842,  prev: 8910,  change: 10.5 },
  avgOrderValue:{ value: 50.98, prev: 50.41, change: 1.1  },
}

export const MONTHLY_REVENUE = [
  { month:'Jan', revenue:38000, expenses:22000 },
  { month:'Feb', revenue:42000, expenses:24000 },
  { month:'Mar', revenue:45000, expenses:21000 },
  { month:'Apr', revenue:40000, expenses:23000 },
  { month:'May', revenue:55000, expenses:26000 },
  { month:'Jun', revenue:58000, expenses:28000 },
  { month:'Jul', revenue:52000, expenses:25000 },
  { month:'Aug', revenue:61000, expenses:29000 },
  { month:'Sep', revenue:65000, expenses:31000 },
  { month:'Oct', revenue:59000, expenses:27000 },
  { month:'Nov', revenue:70000, expenses:33000 },
  { month:'Dec', revenue:78000, expenses:35000 },
]

// ─── Note colors palette ───────────────────────────────────────
export const NOTE_COLORS = [
  { name:'Yellow', value:'#fef9c3', bg:'#fef9c3', border:'#fde68a', text:'#713f12' },
  { name:'Blue',   value:'#dbeafe', bg:'#dbeafe', border:'#bfdbfe', text:'#1e3a8a' },
  { name:'Green',  value:'#dcfce7', bg:'#dcfce7', border:'#bbf7d0', text:'#14532d' },
  { name:'Pink',   value:'#fce7f3', bg:'#fce7f3', border:'#fbcfe8', text:'#831843' },
  { name:'Purple', value:'#f3e8ff', bg:'#f3e8ff', border:'#e9d5ff', text:'#581c87' },
  { name:'Orange', value:'#ffedd5', bg:'#ffedd5', border:'#fed7aa', text:'#7c2d12' },
  { name:'Red',    value:'#fee2e2', bg:'#fee2e2', border:'#fecaca', text:'#7f1d1d' },
  { name:'Gray',   value:'#f3f4f6', bg:'#f3f4f6', border:'#e5e7eb', text:'#1f2937' },
]
