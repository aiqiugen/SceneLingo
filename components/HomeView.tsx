import React, { useState, useMemo } from 'react';
import { ScenarioCategory } from '../types';
import { 
  SearchIcon, PlaneIcon, TrainIcon, HomeIcon, CoffeeIcon, SparklesIcon,
  ShoppingBagIcon, BriefcaseIcon, ActivityIcon, UtensilsIcon,
  CarIcon, DeviceIcon, HeartIcon, UsersIcon
} from './Icons';

// Categories for the dropdown
const CATEGORIES = [
  { id: 'all', label: '全部场景 (All)' },
  { id: 'travel', label: '旅行出行 (Travel)' },
  { id: 'transport', label: '交通驾驶 (Transport)' },
  { id: 'accommodation', label: '住宿 (Accommodation)' },
  { id: 'dining', label: '餐饮美食 (Dining)' },
  { id: 'shopping', label: '购物消费 (Shopping)' },
  { id: 'life', label: '日常生活 (Daily Life)' },
  { id: 'work', label: '工作职场 (Work)' },
  { id: 'education', label: '教育学习 (Education)' },
  { id: 'medical', label: '医疗健康 (Health)' },
  { id: 'social', label: '社交娱乐 (Social)' },
  { id: 'service', label: '公共服务 (Services)' },
  { id: 'emergency', label: '紧急状况 (Emergency)' },
];

const createScenarios = (): ScenarioCategory[] => [
  // --- Travel: Air ---
  { id: 'airport_checkin', name: 'Airport Check-in', nameCN: '机场值机', category: 'travel', description: 'Bags, passports, and tickets', icon: 'plane' },
  { id: 'airport_security', name: 'Airport Security', nameCN: '机场安检', category: 'travel', description: 'X-ray, belts, and liquids', icon: 'plane' },
  { id: 'boarding_gate', name: 'Boarding Gate', nameCN: '登机口', category: 'travel', description: 'Announcements and seating', icon: 'plane' },
  { id: 'in_flight', name: 'In Flight', nameCN: '飞行中', category: 'travel', description: 'Meals, safety, and comfort', icon: 'plane' },
  { id: 'in_flight_sickness', name: 'In-Flight Sickness', nameCN: '晕机/不适', category: 'travel', description: 'Nausea, assistance, water', icon: 'plane' },
  { id: 'flight_delay', name: 'Flight Delay', nameCN: '航班延误', category: 'travel', description: 'Rebooking, compensation, hotels', icon: 'plane' },
  { id: 'missed_connection', name: 'Missed Connection', nameCN: '错通过程航班', category: 'travel', description: 'Running, schedules, help desk', icon: 'plane' },
  { id: 'customs', name: 'Customs', nameCN: '海关入境', category: 'travel', description: 'Declarations and purpose of visit', icon: 'plane' },
  { id: 'baggage_claim', name: 'Baggage Claim', nameCN: '行李提取', category: 'travel', description: 'Lost luggage and carousels', icon: 'plane' },
  { id: 'lost_luggage', name: 'Lost Luggage', nameCN: '行李丢失', category: 'travel', description: 'Forms, descriptions, delivery', icon: 'plane' },
  { id: 'visa_issues', name: 'Visa Issues', nameCN: '签证问题', category: 'travel', description: 'Documents, explanations, officers', icon: 'plane' },

  // --- Travel: Land & Sea ---
  { id: 'train_station', name: 'Train Station', nameCN: '火车站', category: 'transport', description: 'Platforms and timetables', icon: 'train' },
  { id: 'buying_train_ticket', name: 'Buying Train Ticket', nameCN: '购买火车票', category: 'transport', description: 'Kiosk, window, destinations', icon: 'train' },
  { id: 'on_the_train', name: 'On the Train', nameCN: '火车上', category: 'transport', description: 'Conductors and dining cars', icon: 'train' },
  { id: 'subway', name: 'Taking the Subway', nameCN: '乘坐地铁', category: 'transport', description: 'Maps, transfers, and cards', icon: 'train' },
  { id: 'subway_nav', name: 'Subway Navigation', nameCN: '地铁换乘', category: 'transport', description: 'Exits, lines, transfers', icon: 'train' },
  { id: 'taxi', name: 'Taking a Taxi', nameCN: '乘坐出租车', category: 'transport', description: 'Destinations and fares', icon: 'train' },
  { id: 'ride_share', name: 'Ride Share', nameCN: '网约车', category: 'transport', description: 'Pickup spot, rating, route', icon: 'train' },
  { id: 'bus', name: 'Taking the Bus', nameCN: '乘坐公交', category: 'transport', description: 'Stops and exact change', icon: 'train' },
  { id: 'long_distance_bus', name: 'Long Distance Bus', nameCN: '长途大巴', category: 'transport', description: 'Luggage storage, breaks', icon: 'train' },
  { id: 'car_rental', name: 'Car Rental', nameCN: '租车', category: 'transport', description: 'Insurance and mileage', icon: 'car' },
  { id: 'car_rental_return', name: 'Returning Rental Car', nameCN: '还车', category: 'transport', description: 'Gas tank, inspection, keys', icon: 'car' },
  { id: 'gas_station', name: 'Gas Station', nameCN: '加油站', category: 'transport', description: 'Pumping gas and tire pressure', icon: 'car' },
  { id: 'asking_directions', name: 'Asking Directions', nameCN: '问路', category: 'travel', description: 'Left, right, and landmarks', icon: 'sparkles' },
  { id: 'cruise_checkin', name: 'Cruise Check-in', nameCN: '邮轮登船', category: 'travel', description: 'Cabin, safety drill, dining', icon: 'plane' },
  { id: 'ferry', name: 'Taking a Ferry', nameCN: '乘坐轮渡', category: 'transport', description: 'Tickets, seating, cars', icon: 'train' },

  // --- Automotive ---
  { id: 'flat_tire', name: 'Flat Tire', nameCN: '爆胎', category: 'transport', description: 'Jack, spare tire, assistance', icon: 'car' },
  { id: 'engine_trouble', name: 'Engine Trouble', nameCN: '引擎故障', category: 'transport', description: 'Smoke, noises, mechanic', icon: 'car' },
  { id: 'car_accident', name: 'Car Accident', nameCN: '交通事故', category: 'emergency', description: 'Insurance and police', icon: 'car' },
  { id: 'traffic_stop', name: 'Police Traffic Stop', nameCN: '交警拦车', category: 'transport', description: 'License, registration, speeding', icon: 'car' },
  { id: 'parking', name: 'Parking Garage', nameCN: '停车场', category: 'transport', description: 'Tickets, payments, validation', icon: 'car' },
  { id: 'parking_ticket', name: 'Parking Ticket', nameCN: '停车罚单', category: 'transport', description: 'Fine, violation, appeals', icon: 'car' },
  { id: 'buying_car', name: 'Buying Used Car', nameCN: '买二手车', category: 'transport', description: 'Mileage, history, test drive', icon: 'car' },
  { id: 'car_wash', name: 'Car Wash', nameCN: '洗车', category: 'transport', description: 'Soap, wax, vacuum', icon: 'car' },

  // --- Accommodation ---
  { id: 'hotel_checkin', name: 'Hotel Check-in', nameCN: '酒店入住', category: 'accommodation', description: 'Reservations and key cards', icon: 'home' },
  { id: 'hotel_room', name: 'Hotel Room Issues', nameCN: '房间问题', category: 'accommodation', description: 'AC, towels, and noise', icon: 'home' },
  { id: 'hotel_concierge', name: 'Concierge', nameCN: '礼宾服务', category: 'accommodation', description: 'Recommendations and bookings', icon: 'home' },
  { id: 'hotel_checkout', name: 'Hotel Check-out', nameCN: '退房', category: 'accommodation', description: 'Bill and mini-bar', icon: 'home' },
  { id: 'hotel_breakfast', name: 'Hotel Breakfast', nameCN: '酒店早餐', category: 'accommodation', description: 'Buffet, seating, hours', icon: 'home' },
  { id: 'airbnb', name: 'Airbnb/Rental', nameCN: '民宿入住', category: 'accommodation', description: 'House rules and lockboxes', icon: 'home' },
  { id: 'airbnb_host', name: 'Messaging Host', nameCN: '联系房东', category: 'accommodation', description: 'Arrival time, wifi, keys', icon: 'home' },
  { id: 'hostel', name: 'Youth Hostel', nameCN: '青年旅舍', category: 'accommodation', description: 'Shared rooms and lockers', icon: 'home' },
  { id: 'camping_checkin', name: 'Campsite', nameCN: '露营地', category: 'accommodation', description: 'Tent site, RV hookup', icon: 'home' },

  // --- Dining ---
  { id: 'cafe', name: 'Coffee Shop', nameCN: '咖啡店', category: 'dining', description: 'Lattes, sizes, and pastries', icon: 'coffee' },
  { id: 'fast_food', name: 'Fast Food', nameCN: '快餐店', category: 'dining', description: 'Combos and take-out', icon: 'food' },
  { id: 'restaurant_reservation', name: 'Reservation', nameCN: '餐厅预订', category: 'dining', description: 'Tables and times', icon: 'food' },
  { id: 'ordering_food', name: 'Ordering Food', nameCN: '点餐', category: 'dining', description: 'Menu items and specials', icon: 'food' },
  { id: 'ordering_steak', name: 'Ordering Steak', nameCN: '点牛排', category: 'dining', description: 'Rare, medium, well-done', icon: 'food' },
  { id: 'ordering_wine', name: 'Ordering Wine', nameCN: '点酒', category: 'dining', description: 'Red, white, glass, bottle', icon: 'food' },
  { id: 'dietary_restrictions', name: 'Dietary Restrictions', nameCN: '饮食禁忌', category: 'dining', description: 'Allergies and preferences', icon: 'food' },
  { id: 'vegan_ordering', name: 'Ordering Vegan', nameCN: '素食点餐', category: 'dining', description: 'Dairy-free, meat-free', icon: 'food' },
  { id: 'paying_bill', name: 'Paying the Bill', nameCN: '买单', category: 'dining', description: 'Splitting and tipping', icon: 'food' },
  { id: 'complaining_food', name: 'Food Complaint', nameCN: '投诉菜品', category: 'dining', description: 'Cold, wrong order, taste', icon: 'food' },
  { id: 'bar', name: 'At a Bar', nameCN: '酒吧', category: 'dining', description: 'Drinks and tabs', icon: 'coffee' },
  { id: 'bakery', name: 'Bakery', nameCN: '面包房', category: 'dining', description: 'Bread and sweets', icon: 'coffee' },
  { id: 'pizza_shop', name: 'Ordering Pizza', nameCN: '订披萨', category: 'dining', description: 'Toppings and delivery', icon: 'food' },
  { id: 'ice_cream', name: 'Ice Cream Shop', nameCN: '冰淇淋店', category: 'dining', description: 'Scoops, flavors, cones', icon: 'food' },
  { id: 'buffet', name: 'Buffet Dining', nameCN: '自助餐', category: 'dining', description: 'All you can eat, plates', icon: 'food' },
  { id: 'street_food', name: 'Street Food', nameCN: '街头小吃', category: 'dining', description: 'Snacks, cash, hygiene', icon: 'food' },
  { id: 'food_delivery_app', name: 'Food Delivery App', nameCN: '外卖APP', category: 'dining', description: 'Tracking, refund', icon: 'device' },

  // --- Shopping ---
  { id: 'grocery', name: 'Grocery Store', nameCN: '杂货店/超市', category: 'shopping', description: 'Produce and aisles', icon: 'shopping' },
  { id: 'deli_counter', name: 'Deli Counter', nameCN: '熟食柜台', category: 'shopping', description: 'Slicing meat, cheese', icon: 'shopping' },
  { id: 'supermarket', name: 'Checkout', nameCN: '超市结账', category: 'shopping', description: 'Coupons and bags', icon: 'shopping' },
  { id: 'pharmacy_shopping', name: 'Pharmacy (Retail)', nameCN: '药妆店', category: 'shopping', description: 'Toiletries and medicine', icon: 'shopping' },
  { id: 'convenience_store', name: 'Convenience Store', nameCN: '便利店', category: 'shopping', description: 'Snacks, drinks, atm', icon: 'shopping' },
  { id: 'market', name: 'Flea Market', nameCN: '跳蚤市场', category: 'shopping', description: 'Bargaining and antiques', icon: 'shopping' },
  { id: 'farmers_market', name: 'Farmers Market', nameCN: '农夫市场', category: 'shopping', description: 'Fresh produce', icon: 'shopping' },
  { id: 'clothing_store', name: 'Clothing Store', nameCN: '服装店', category: 'shopping', description: 'Sizes and fitting rooms', icon: 'shopping' },
  { id: 'shoe_store', name: 'Shoe Store', nameCN: '鞋店', category: 'shopping', description: 'Trying on and sizes', icon: 'shopping' },
  { id: 'electronics', name: 'Electronics Store', nameCN: '电子产品店', category: 'shopping', description: 'Gadgets and warranties', icon: 'shopping' },
  { id: 'bookstore', name: 'Bookstore', nameCN: '书店', category: 'shopping', description: 'Genres and bestsellers', icon: 'shopping' },
  { id: 'souvenir_shop', name: 'Souvenir Shop', nameCN: '纪念品店', category: 'shopping', description: 'Gifts and postcards', icon: 'shopping' },
  { id: 'jewelry_store', name: 'Jewelry Store', nameCN: '珠宝店', category: 'shopping', description: 'Rings, diamonds, repairs', icon: 'shopping' },
  { id: 'furniture_store', name: 'Furniture Store', nameCN: '家具店', category: 'shopping', description: 'Delivery, sofa, assembly', icon: 'shopping' },
  { id: 'hardware_store', name: 'Hardware Store', nameCN: '五金店', category: 'shopping', description: 'Tools, paint, screws', icon: 'shopping' },
  { id: 'flower_shop', name: 'Flower Shop', nameCN: '花店', category: 'shopping', description: 'Bouquets, roses', icon: 'shopping' },
  { id: 'pet_store', name: 'Pet Store', nameCN: '宠物店', category: 'shopping', description: 'Food, toys, adoption', icon: 'shopping' },
  { id: 'cosmetics', name: 'Makeup Counter', nameCN: '化妆品专柜', category: 'shopping', description: 'Shades, samples', icon: 'shopping' },
  { id: 'perfume', name: 'Perfume Shop', nameCN: '香水店', category: 'shopping', description: 'Scents, tester', icon: 'shopping' },
  { id: 'returns', name: 'Returns', nameCN: '退换货', category: 'shopping', description: 'Receipts and exchanges', icon: 'shopping' },
  { id: 'duty_free', name: 'Duty Free', nameCN: '免税店', category: 'shopping', description: 'Tax-free items', icon: 'shopping' },

  // --- Daily Life ---
  { id: 'home_chores', name: 'Doing Chores', nameCN: '做家务', category: 'life', description: 'Cleaning and laundry', icon: 'home' },
  { id: 'cooking', name: 'Cooking Dinner', nameCN: '做晚饭', category: 'life', description: 'Recipes and ingredients', icon: 'home' },
  { id: 'baking', name: 'Baking', nameCN: '烘焙', category: 'life', description: 'Flour, oven, mixing', icon: 'home' },
  { id: 'gardening', name: 'Gardening', nameCN: '园艺', category: 'life', description: 'Plants and tools', icon: 'home' },
  { id: 'walking_dog', name: 'Walking Dog', nameCN: '遛狗', category: 'life', description: 'Leashes and parks', icon: 'home' },
  { id: 'recycling', name: 'Recycling', nameCN: '垃圾回收', category: 'life', description: 'Sorting bins, pickup day', icon: 'home' },
  { id: 'delivery', name: 'Receiving Delivery', nameCN: '收快递', category: 'life', description: 'Packages and signatures', icon: 'home' },
  { id: 'neighbors', name: 'Noisy Neighbors', nameCN: '噪音投诉', category: 'life', description: 'Complaining, requests', icon: 'home' },
  { id: 'meeting_neighbors', name: 'Meeting Neighbors', nameCN: '遇见邻居', category: 'life', description: 'Introductions', icon: 'home' },
  { id: 'home_repair', name: 'Home Repair', nameCN: '家庭维修', category: 'life', description: 'Leaks and fixing things', icon: 'home' },
  { id: 'plumber', name: 'Plumber', nameCN: '水管工', category: 'life', description: 'Clogged drain, pipes', icon: 'home' },
  { id: 'electrician', name: 'Electrician', nameCN: '电工', category: 'life', description: 'Wiring, fuses, outages', icon: 'home' },
  { id: 'pest_control', name: 'Pest Control', nameCN: '除虫', category: 'life', description: 'Insects, traps', icon: 'home' },
  { id: 'hiring_cleaner', name: 'Hiring Cleaner', nameCN: '雇佣保洁', category: 'life', description: 'Tasks, hours, rates', icon: 'home' },

  // --- Work ---
  { id: 'job_interview', name: 'Job Interview', nameCN: '面试', category: 'work', description: 'Strengths and experience', icon: 'work' },
  { id: 'resume', name: 'Discussing Resume', nameCN: '讨论简历', category: 'work', description: 'Skills, education', icon: 'work' },
  { id: 'salary', name: 'Salary Negotiation', nameCN: '谈薪资', category: 'work', description: 'Offers, bonuses', icon: 'work' },
  { id: 'first_day', name: 'First Day', nameCN: '入职第一天', category: 'work', description: 'Introductions and tours', icon: 'work' },
  { id: 'meeting', name: 'Meeting', nameCN: '开会', category: 'work', description: 'Agenda and minutes', icon: 'work' },
  { id: 'presentation', name: 'Presentation', nameCN: '演示汇报', category: 'work', description: 'Slides and Q&A', icon: 'work' },
  { id: 'video_call', name: 'Video Conference', nameCN: '视频会议', category: 'work', description: 'Mute, screen share', icon: 'work' },
  { id: 'water_cooler', name: 'Water Cooler', nameCN: '茶水间闲聊', category: 'work', description: 'Weekend plans', icon: 'work' },
  { id: 'asking_leave', name: 'Asking for Leave', nameCN: '请假', category: 'work', description: 'Vacation and sick days', icon: 'work' },
  { id: 'performance_review', name: 'Performance Review', nameCN: '绩效考核', category: 'work', description: 'Feedback, goals', icon: 'work' },
  { id: 'resignation', name: 'Resigning', nameCN: '辞职', category: 'work', description: 'Notice period', icon: 'work' },
  { id: 'firing', name: 'Getting Fired', nameCN: '被解雇', category: 'work', description: 'Severance, reasons', icon: 'work' },
  { id: 'office_conflict', name: 'Office Conflict', nameCN: '办公室冲突', category: 'work', description: 'Disagreements', icon: 'work' },
  { id: 'tech_support', name: 'IT Support', nameCN: 'IT支持', category: 'work', description: 'Broken laptop, login', icon: 'work' },
  { id: 'networking', name: 'Networking', nameCN: '商务社交', category: 'work', description: 'Business cards', icon: 'work' },
  { id: 'sales_call', name: 'Sales Call', nameCN: '销售电话', category: 'work', description: 'Pitching, leads', icon: 'work' },
  { id: 'client_dinner', name: 'Client Dinner', nameCN: '客户晚宴', category: 'work', description: 'Hosting, toasts', icon: 'work' },
  { id: 'contract', name: 'Signing Contract', nameCN: '签合同', category: 'work', description: 'Clauses, terms', icon: 'work' },
  { id: 'negotiation', name: 'Negotiation', nameCN: '商务谈判', category: 'work', description: 'Prices, compromise', icon: 'work' },
  { id: 'factory_visit', name: 'Factory Visit', nameCN: '参观工厂', category: 'work', description: 'Production line', icon: 'work' },
  { id: 'trade_show', name: 'Trade Show', nameCN: '贸易展会', category: 'work', description: 'Booths, demos', icon: 'work' },
  { id: 'coworking', name: 'Coworking Space', nameCN: '共享办公', category: 'work', description: 'Desks, wifi', icon: 'work' },

  // --- Medical ---
  { id: 'doctor_appt', name: 'Doctor Appointment', nameCN: '看医生', category: 'medical', description: 'Symptoms and checkups', icon: 'medical' },
  { id: 'dentist', name: 'Dentist', nameCN: '看牙医', category: 'medical', description: 'Cavities, cleaning', icon: 'medical' },
  { id: 'pharmacy_meds', name: 'Pharmacy (Meds)', nameCN: '药房买药', category: 'medical', description: 'Dosage, side effects', icon: 'medical' },
  { id: 'er', name: 'Emergency Room', nameCN: '急诊室', category: 'medical', description: 'Urgent care, triage', icon: 'medical' },
  { id: 'hospital_admission', name: 'Hospital Admission', nameCN: '住院登记', category: 'medical', description: 'Forms, insurance', icon: 'medical' },
  { id: 'optometrist', name: 'Eye Doctor', nameCN: '看眼科', category: 'medical', description: 'Glasses, vision test', icon: 'medical' },
  { id: 'calling_911', name: 'Calling 911', nameCN: '拨打急救', category: 'emergency', description: 'Ambulance, address', icon: 'medical' },
  { id: 'physical_therapy', name: 'Physical Therapy', nameCN: '物理治疗', category: 'medical', description: 'Exercises, injury', icon: 'medical' },
  { id: 'xray', name: 'X-Ray/MRI', nameCN: '拍X光/核磁', category: 'medical', description: 'Stillness, machines', icon: 'medical' },
  { id: 'vaccination', name: 'Vaccination', nameCN: '接种疫苗', category: 'medical', description: 'Shot, records', icon: 'medical' },
  { id: 'sick_child', name: 'Sick Child', nameCN: '照顾生病孩子', category: 'medical', description: 'Fever, medicine', icon: 'medical' },
  { id: 'mental_health', name: 'Therapy', nameCN: '心理咨询', category: 'medical', description: 'Feelings, stress', icon: 'medical' },
  { id: 'dermatologist', name: 'Dermatologist', nameCN: '看皮肤科', category: 'medical', description: 'Skin, rash', icon: 'medical' },
  { id: 'gym', name: 'At the Gym', nameCN: '健身房', category: 'medical', description: 'Weights, cardio', icon: 'medical' },
  { id: 'yoga', name: 'Yoga Class', nameCN: '瑜伽课', category: 'medical', description: 'Poses, breathing', icon: 'medical' },
  { id: 'spa', name: 'Spa Day', nameCN: '水疗/按摩', category: 'medical', description: 'Massage, relaxation', icon: 'sparkles' },
  { id: 'hair_salon', name: 'Hair Salon', nameCN: '理发店', category: 'life', description: 'Cut, color', icon: 'sparkles' },
  { id: 'barber', name: 'Barber Shop', nameCN: '男士理发', category: 'life', description: 'Shave, fade', icon: 'sparkles' },
  { id: 'manicure', name: 'Nail Salon', nameCN: '美甲店', category: 'life', description: 'Polish, pedicure', icon: 'sparkles' },

  // --- Service / Admin ---
  { id: 'bank', name: 'Bank', nameCN: '银行', category: 'service', description: 'Deposits, tellers', icon: 'work' },
  { id: 'opening_account', name: 'Opening Account', nameCN: '开户', category: 'service', description: 'ID, forms', icon: 'work' },
  { id: 'loan_application', name: 'Applying for Loan', nameCN: '申请贷款', category: 'service', description: 'Rates, credit score', icon: 'work' },
  { id: 'currency_exchange', name: 'Currency Exchange', nameCN: '货币兑换', category: 'service', description: 'Rates, cash', icon: 'work' },
  { id: 'credit_card_fraud', name: 'Reporting Fraud', nameCN: '挂失信用卡', category: 'service', description: 'Stolen card, block', icon: 'work' },
  { id: 'taxes', name: 'Doing Taxes', nameCN: '报税', category: 'service', description: 'Forms, refund', icon: 'work' },
  { id: 'insurance_claim', name: 'Insurance Claim', nameCN: '保险理赔', category: 'service', description: 'Damage, payout', icon: 'work' },
  { id: 'post_office', name: 'Post Office', nameCN: '邮局', category: 'service', description: 'Stamps, packages', icon: 'work' },
  { id: 'real_estate', name: 'Viewing Apartment', nameCN: '看房', category: 'service', description: 'Rent, lease', icon: 'home' },
  { id: 'signing_lease', name: 'Signing Lease', nameCN: '签租房合同', category: 'service', description: 'Deposit, terms', icon: 'home' },
  { id: 'dmv', name: 'DMV', nameCN: '车管所', category: 'service', description: 'Driving test, license', icon: 'car' },
  { id: 'voting', name: 'Voting', nameCN: '投票', category: 'service', description: 'Ballot, id', icon: 'work' },
  { id: 'lawyer', name: 'Lawyer', nameCN: '见律师', category: 'service', description: 'Advice, fees', icon: 'work' },
  { id: 'embassy', name: 'Embassy', nameCN: '大使馆', category: 'service', description: 'Passport, assistance', icon: 'plane' },

  // --- Education ---
  { id: 'classroom', name: 'Classroom', nameCN: '在教室', category: 'education', description: 'Questions, notes', icon: 'work' },
  { id: 'lecture', name: 'University Lecture', nameCN: '大学讲座', category: 'education', description: 'Professor, slides', icon: 'work' },
  { id: 'library', name: 'Library', nameCN: '图书馆', category: 'education', description: 'Studying, silence', icon: 'work' },
  { id: 'exam', name: 'Taking Exam', nameCN: '考试', category: 'education', description: 'Multiple choice, time', icon: 'work' },
  { id: 'group_project', name: 'Group Project', nameCN: '小组作业', category: 'education', description: 'Collaboration', icon: 'work' },
  { id: 'dorm', name: 'Dorm Life', nameCN: '宿舍生活', category: 'education', description: 'Roommate, rules', icon: 'home' },
  { id: 'language_school', name: 'Language School', nameCN: '语言学校', category: 'education', description: 'Grammar, speaking', icon: 'work' },
  { id: 'registration', name: 'Course Registration', nameCN: '选课', category: 'education', description: 'Credits, schedule', icon: 'work' },
  { id: 'graduation', name: 'Graduation', nameCN: '毕业典礼', category: 'education', description: 'Gown, diploma', icon: 'work' },
  { id: 'parent_teacher', name: 'Parent-Teacher', nameCN: '家长会', category: 'education', description: 'Grades, progress', icon: 'users' },

  // --- Tech ---
  { id: 'buying_phone', name: 'Buying Phone', nameCN: '买手机', category: 'service', description: 'Model, plan', icon: 'device' },
  { id: 'phone_repair', name: 'Phone Repair', nameCN: '修手机', category: 'service', description: 'Screen, battery', icon: 'device' },
  { id: 'internet_setup', name: 'Internet Setup', nameCN: '装宽带', category: 'service', description: 'Router, wifi', icon: 'device' },
  { id: 'forgot_password', name: 'Forgot Password', nameCN: '忘记密码', category: 'service', description: 'Reset, email', icon: 'device' },
  { id: 'software_bug', name: 'Reporting Bug', nameCN: '报告Bug', category: 'work', description: 'Crash, error', icon: 'device' },
  { id: 'printer_issues', name: 'Printer Issues', nameCN: '打印机故障', category: 'work', description: 'Paper jam', icon: 'device' },
  { id: 'scam_call', name: 'Scam Call', nameCN: '诈骗电话', category: 'emergency', description: 'Blocking, reporting', icon: 'device' },

  // --- Social ---
  { id: 'dating', name: 'First Date', nameCN: '初次约会', category: 'social', description: 'Hobbies, nerves', icon: 'heart' },
  { id: 'party', name: 'House Party', nameCN: '家庭聚会', category: 'social', description: 'Drinks, music', icon: 'users' },
  { id: 'dinner_party', name: 'Dinner Party', nameCN: '晚宴', category: 'social', description: 'Hosting, serving', icon: 'users' },
  { id: 'wedding', name: 'Wedding', nameCN: '婚礼', category: 'social', description: 'Ceremony, toast', icon: 'heart' },
  { id: 'birthday', name: 'Birthday', nameCN: '生日派对', category: 'social', description: 'Cake, candles', icon: 'sparkles' },
  { id: 'gift_giving', name: 'Gift Giving', nameCN: '送礼物', category: 'social', description: 'Wrapping, thanks', icon: 'sparkles' },
  { id: 'baby_shower', name: 'Baby Shower', nameCN: '迎婴派对', category: 'social', description: 'Games, gifts', icon: 'users' },
  { id: 'compliment', name: 'Compliments', nameCN: '赞美', category: 'social', description: 'Clothes, work', icon: 'heart' },
  { id: 'invitation', name: 'Invitation', nameCN: '发出邀请', category: 'social', description: 'Plans, time', icon: 'users' },
  { id: 'introducing', name: 'Introductions', nameCN: '介绍朋友', category: 'social', description: 'Names, connections', icon: 'users' },
  { id: 'small_talk', name: 'Small Talk', nameCN: '闲聊', category: 'social', description: 'Weather, traffic', icon: 'users' },
  { id: 'apology', name: 'Apologizing', nameCN: '道歉', category: 'social', description: 'Mistake, sorry', icon: 'heart' },
  { id: 'condolences', name: 'Condolences', nameCN: '慰问/哀悼', category: 'social', description: 'Funeral, loss', icon: 'heart' },
  { id: 'breakup', name: 'Breaking Up', nameCN: '分手', category: 'social', description: 'Feelings, crying', icon: 'heart' },
  { id: 'borrowing_money', name: 'Borrowing Money', nameCN: '借钱', category: 'social', description: 'Request, repay', icon: 'work' },
  { id: 'asking_favor', name: 'Asking Favor', nameCN: '请求帮助', category: 'social', description: 'Help, please', icon: 'users' },
  { id: 'declining', name: 'Declining', nameCN: '拒绝邀请', category: 'social', description: 'Busy, sorry', icon: 'users' },
  { id: 'disagreement', name: 'Argument', nameCN: '争论', category: 'social', description: 'Opinion, debate', icon: 'users' },
  { id: 'confrontation', name: 'Confrontation', nameCN: '对峙', category: 'social', description: 'Problem, angry', icon: 'users' },

  // --- Entertainment ---
  { id: 'cinema', name: 'Movie Theater', nameCN: '电影院', category: 'social', description: 'Tickets, popcorn', icon: 'sparkles' },
  { id: 'streaming', name: 'Streaming', nameCN: '看流媒体', category: 'life', description: 'Choosing, buffering', icon: 'device' },
  { id: 'concert', name: 'Concert', nameCN: '演唱会', category: 'social', description: 'Live music, crowd', icon: 'sparkles' },
  { id: 'music_festival', name: 'Music Festival', nameCN: '音乐节', category: 'social', description: 'Tent, wristband', icon: 'sparkles' },
  { id: 'museum', name: 'Museum', nameCN: '博物馆', category: 'social', description: 'Art, history', icon: 'sparkles' },
  { id: 'art_gallery', name: 'Art Gallery', nameCN: '画廊', category: 'social', description: 'Painting, buy', icon: 'sparkles' },
  { id: 'theater_play', name: 'Theater', nameCN: '剧院看戏', category: 'social', description: 'Stage, actors', icon: 'sparkles' },
  { id: 'zoo', name: 'Zoo', nameCN: '动物园', category: 'social', description: 'Animals, map', icon: 'sparkles' },
  { id: 'aquarium', name: 'Aquarium', nameCN: '水族馆', category: 'social', description: 'Fish, tank', icon: 'sparkles' },
  { id: 'theme_park', name: 'Theme Park', nameCN: '游乐园', category: 'social', description: 'Rollercoaster', icon: 'sparkles' },
  { id: 'casino', name: 'Casino', nameCN: '赌场', category: 'social', description: 'Chips, cards', icon: 'sparkles' },
  { id: 'nightclub', name: 'Nightclub', nameCN: '夜店', category: 'social', description: 'Dancing, dj', icon: 'sparkles' },
  { id: 'karaoke', name: 'Karaoke', nameCN: 'KTV', category: 'social', description: 'Singing, mic', icon: 'sparkles' },
  { id: 'bowling', name: 'Bowling', nameCN: '保龄球', category: 'social', description: 'Shoes, lane', icon: 'sparkles' },
  { id: 'gaming', name: 'Video Gaming', nameCN: '打游戏', category: 'life', description: 'Online, level', icon: 'device' },
  { id: 'photography', name: 'Photography', nameCN: '摄影', category: 'life', description: 'Camera, lens', icon: 'device' },
  { id: 'fishing', name: 'Fishing', nameCN: '钓鱼', category: 'life', description: 'Rod, bait', icon: 'sparkles' },
  { id: 'hiking', name: 'Hiking', nameCN: '徒步', category: 'life', description: 'Trail, boots', icon: 'sparkles' },
  { id: 'beach', name: 'Beach', nameCN: '海滩', category: 'life', description: 'Sand, sun', icon: 'sparkles' },
  { id: 'skiing', name: 'Skiing', nameCN: '滑雪', category: 'life', description: 'Lift pass, snow', icon: 'sparkles' },
  { id: 'golf', name: 'Golf', nameCN: '高尔夫', category: 'life', description: 'Clubs, par', icon: 'sparkles' },
  { id: 'soccer', name: 'Soccer Match', nameCN: '足球赛', category: 'social', description: 'Goal, referee', icon: 'activity' },
  { id: 'tennis', name: 'Tennis Match', nameCN: '网球赛', category: 'social', description: 'Serve, set', icon: 'activity' },

  // --- Other Services ---
  { id: 'dry_cleaner', name: 'Dry Cleaners', nameCN: '干洗店', category: 'service', description: 'Stains, ticket', icon: 'shopping' },
  { id: 'tailor', name: 'Tailor', nameCN: '裁缝店', category: 'service', description: 'Hemming, fitting', icon: 'shopping' },
  { id: 'shoe_repair', name: 'Shoe Repair', nameCN: '修鞋', category: 'service', description: 'Heel, sole', icon: 'shopping' },
  { id: 'photo_print', name: 'Photo Printing', nameCN: '打印照片', category: 'service', description: 'Size, glossy', icon: 'device' },
  { id: 'library_public', name: 'Public Library', nameCN: '公共图书馆', category: 'service', description: 'Card, borrow', icon: 'home' },
  { id: 'vet', name: 'Veterinarian', nameCN: '兽医', category: 'service', description: 'Pet sick, shots', icon: 'medical' },
  { id: 'dog_groomer', name: 'Dog Groomer', nameCN: '宠物美容', category: 'service', description: 'Wash, cut', icon: 'sparkles' },

  // --- Emergency / Specific ---
  { id: 'police_report', name: 'Reporting Crime', nameCN: '报警', category: 'emergency', description: 'Theft, officer', icon: 'medical' },
  { id: 'lost_child', name: 'Lost Child', nameCN: '孩子走失', category: 'emergency', description: 'Panic, help', icon: 'medical' },
  { id: 'lost_wallet', name: 'Lost Wallet', nameCN: '钱包丢了', category: 'emergency', description: 'Cards, money', icon: 'work' },
  { id: 'fire', name: 'Fire', nameCN: '火灾', category: 'emergency', description: 'Smoke, evacuate', icon: 'medical' },
  { id: 'earthquake', name: 'Earthquake', nameCN: '地震', category: 'emergency', description: 'Shake, cover', icon: 'medical' },
  { id: 'power_outage', name: 'Power Outage', nameCN: '停电', category: 'emergency', description: 'Candles, fuse', icon: 'home' },
  { id: 'locksmith', name: 'Locked Out', nameCN: '锁在门外', category: 'emergency', description: 'Keys, picking', icon: 'home' },
  { id: 'lost_found', name: 'Lost & Found', nameCN: '失物招领', category: 'emergency', description: 'Item description', icon: 'sparkles' },

  // --- Parenting / Other ---
  { id: 'playground', name: 'Playground', nameCN: '游乐场', category: 'life', description: 'Swing, slide', icon: 'users' },
  { id: 'bedtime', name: 'Bedtime', nameCN: '哄睡', category: 'life', description: 'Story, sleep', icon: 'home' },
  { id: 'babysitter', name: 'Babysitter', nameCN: '保姆', category: 'service', description: 'Rules, rates', icon: 'users' },
  { id: 'playdate', name: 'Playdate', nameCN: '孩子聚会', category: 'social', description: 'Sharing, toys', icon: 'users' },
  { id: 'potty_training', name: 'Potty Training', nameCN: '如厕训练', category: 'life', description: 'Diapers, success', icon: 'home' },
  { id: 'church', name: 'Church', nameCN: '教堂', category: 'life', description: 'Pray, hymn', icon: 'sparkles' },
  { id: 'mosque', name: 'Mosque', nameCN: '清真寺', category: 'life', description: 'Prayer, shoes', icon: 'sparkles' },
  { id: 'temple', name: 'Temple', nameCN: '寺庙', category: 'life', description: 'Offering, incense', icon: 'sparkles' },
];

const ALL_SCENARIOS = createScenarios();

interface HomeViewProps {
  onSelectScenario: (scenarioName: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSelectScenario }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredScenarios = useMemo(() => {
    return ALL_SCENARIOS.filter(s => {
      const matchesSearch = !searchTerm.trim() || 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.nameCN.includes(searchTerm) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const renderIcon = (iconName: string, className: string) => {
    switch(iconName) {
      case 'plane': return <PlaneIcon className={className} />;
      case 'train': return <TrainIcon className={className} />;
      case 'home': return <HomeIcon className={className} />;
      case 'coffee': return <CoffeeIcon className={className} />;
      case 'shopping': return <ShoppingBagIcon className={className} />;
      case 'work': return <BriefcaseIcon className={className} />;
      case 'medical': return <ActivityIcon className={className} />;
      case 'food': return <UtensilsIcon className={className} />;
      case 'car': return <CarIcon className={className} />;
      case 'device': return <DeviceIcon className={className} />;
      case 'heart': return <HeartIcon className={className} />;
      case 'users': return <UsersIcon className={className} />;
      default: return <SparklesIcon className={className} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Hero / Header */}
      <div className="bg-brand-600 px-6 pt-12 pb-6 rounded-b-3xl shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-2">SceneLingo AI</h1>
        <p className="text-brand-100 mb-6 text-sm sm:text-base">
          Choose from 300+ scenarios to learn English in context.
        </p>
        
        {/* Search Bar & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category Dropdown */}
          <div className="relative shrink-0 sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-brand-700/50 border border-brand-400 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 font-medium text-sm"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} className="text-gray-800 bg-white">
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-200">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search (e.g., 'Visa', 'Yoga', '签证')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 bg-white/95 backdrop-blur shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all placeholder:text-gray-400 text-sm"
            />
            <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 bg-gray-50">
        
        {/* Create Custom Scene Option */}
        {searchTerm && (
          <div 
            onClick={() => onSelectScenario(searchTerm)}
            className="mb-6 bg-gradient-to-r from-brand-500 to-brand-400 rounded-xl p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-98 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium opacity-90 uppercase tracking-wide">Custom Scenario</p>
              <p className="text-lg font-bold">Generate: "{searchTerm}"</p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              <SparklesIcon className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-xs text-gray-500 font-medium px-1 flex justify-between items-center">
           <span>{filteredScenarios.length} Scenarios Found</span>
           {selectedCategory !== 'all' && (
             <span className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded-md">
               {CATEGORIES.find(c => c.id === selectedCategory)?.label}
             </span>
           )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredScenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.name)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group flex items-start space-x-3"
            >
              <div className="flex-shrink-0 p-2.5 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                {renderIcon(scenario.icon, "w-6 h-6")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-gray-800 truncate group-hover:text-brand-700 transition-colors">
                    {scenario.nameCN}
                  </h3>
                </div>
                <p className="text-xs font-medium text-gray-500 truncate mb-1">
                   {scenario.name}
                </p>
                <p className="text-[11px] text-gray-400 line-clamp-1">
                  {scenario.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredScenarios.length === 0 && !searchTerm && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <SearchIcon className="w-8 h-8 opacity-50" />
            </div>
            <p>No scenarios found in this category.</p>
            <button 
              onClick={() => setSelectedCategory('all')}
              className="mt-4 text-brand-600 font-medium text-sm hover:underline"
            >
              View all categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;