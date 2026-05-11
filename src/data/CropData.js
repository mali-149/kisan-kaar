const cropsData = [
    {
      id: '1',
      name: 'Wheat',
      description: 'Wheat is a staple grain in Pakistan, essential for food security and economic stability. It is predominantly grown in Punjab and Sindh provinces, contributing significantly to the country\'s agricultural GDP. Pakistan produces both spring and winter wheat varieties, tailored to different regional conditions.',
      sections: [
        {title: 'Planting', content: 'In Pakistan, wheat is typically planted from mid-October to late November. Optimal planting depth is 4-5 cm in well-prepared seedbeds. The use of certified seeds and proper land preparation are crucial for achieving good germination and yield.'},
        {title: 'Harvesting', content: 'Wheat is harvested in Pakistan from April to early June. The crop is ready for harvest when the grains are hard and golden. Timely harvesting and proper post-harvest handling are essential to minimize losses and maintain grain quality.'},
        {title: 'Seed', content: 'Certified wheat seeds like Sehar-06, Faisalabad-08, and Punjab-11 are recommended for high yield and disease resistance. Seed treatment with fungicides and insecticides before sowing can help in protecting the crop during the early stages.'},
        {title: 'Disease', content: 'Common wheat diseases in Pakistan include rust (yellow, stem, and leaf), smut, and powdery mildew. Resistant varieties and timely fungicide application are crucial. Crop rotation and proper field sanitation can also help in managing these diseases.'},
        {title: 'Crop Protection', content: 'Integrated pest management (IPM) practices, including the use of fungicides, herbicides, and timely irrigation, are essential for protecting wheat crops. Regular field monitoring and use of biological controls can reduce reliance on chemical pesticides.'},
        {title: 'Drip Irrigation', content: 'While traditional flood irrigation is common, drip irrigation is being adopted in water-scarce areas to enhance water use efficiency. This method delivers water directly to the root zone, reducing water waste and improving crop yields.'},
      ],
    },
    {
      id: '2',
      name: 'Rice',
      description: 'Rice is a major cereal grain in Pakistan, especially important for the national economy and export markets. The fertile plains of Punjab and Sindh are ideal for rice cultivation, producing renowned varieties like Basmati, which is prized for its aromatic quality and long grains.',
      sections: [
        {title: 'Water Requirements', content: 'Rice requires abundant water. In Pakistan, it is primarily grown in the Kharif season with irrigation from canals and tubewells. Maintaining standing water in the fields during the growing season is crucial for optimal growth.'},
        {title: 'Harvesting', content: 'Harvesting occurs from September to November. Proper timing is crucial to avoid shattering and ensure grain quality. Mechanical harvesters are increasingly used to reduce labor costs and improve efficiency.'},
        {title: 'Seed', content: 'High-yield and pest-resistant varieties such as IRRI-6, Super Basmati, and KS-282 are recommended for different regions of Pakistan. Seed treatment and the use of certified seeds can enhance germination rates and crop vigor.'},
        {title: 'Disease', content: 'Bacterial leaf blight, rice blast, and sheath blight are common. Management includes resistant varieties, proper spacing, and fungicide use. Regular monitoring and timely intervention are key to controlling these diseases.'},
        {title: 'Crop Protection', content: 'Use of IPM, proper field sanitation, and biological controls along with chemical pesticides help in managing pests and diseases. Maintaining field hygiene and using pheromone traps can also be effective in pest management.'},
        {title: 'Drip Irrigation', content: 'Drip irrigation is not commonly used for rice but can be beneficial in water-scarce areas to save water and ensure efficient irrigation. This method can also help in reducing the incidence of waterborne diseases.'},
        {title: 'Planting', content: 'Rice planting in Pakistan involves either direct seeding or transplanting seedlings into flooded fields, primarily done from June to July. Proper spacing and seed rate are critical to achieving optimal plant density and yield.'},
      ],
    },
    {
      id: '3',
      name: 'Cotton',
      description: 'Cotton is a major cash crop in Pakistan, vital for the textile industry which is a significant part of the country\'s exports. The crop is mainly cultivated in the provinces of Punjab and Sindh. Cotton farming supports a large number of rural households and contributes to the economic stability of these regions. ',
      sections: [
        {title: 'Water Requirements', content: 'Cotton requires moderate water, with critical needs during flowering and boll development. Efficient irrigation practices are essential. Drip and sprinkler irrigation systems are being increasingly adopted to optimize water use.'},
        {title: 'Pests', content: 'Key pests include bollworms, whiteflies, and aphids. Management strategies include resistant varieties, biological controls, and pesticides. Regular field scouting and timely intervention are crucial for effective pest management.'},
        {title: 'Harvesting', content: 'Cotton harvesting in Pakistan begins in October and can extend to January. Both manual and mechanical picking methods are used. Proper handling and storage after harvesting are essential to maintain fiber quality.'},
        {title: 'Seed', content: 'Recommended varieties include CIM-595, FH-142, and MNH-886 for their high yield and pest resistance. Seed treatment with fungicides and insecticides can protect the seedlings during the early stages.'},
        {title: 'Disease', content: 'Common diseases include Cotton Leaf Curl Virus (CLCV), boll rot, and wilt. Regular monitoring and resistant varieties are key to management. Crop rotation and proper field sanitation can also help in controlling these diseases.'},
        {title: 'Crop Protection', content: 'Integrated pest management, including timely pesticide application and field hygiene, is crucial for protecting cotton crops. The use of pheromone traps and beneficial insects can help in reducing pest populations.'},
        {title: 'Drip Irrigation', content: 'Drip irrigation is increasingly adopted to improve water use efficiency and support sustainable cotton farming. This method helps in reducing water waste and ensures uniform water distribution.'},
        {title: 'Planting', content: 'Cotton is typically planted from April to May in Punjab and Sindh, ensuring good soil preparation and proper seed spacing. The use of high-quality seeds and proper seedbed preparation are critical for achieving good germination and plant growth.'},
      ],
    },
    {
      id: '4',
      name: 'Sugar Cane',
      description: 'Sugar cane is an essential crop for Pakistan\'s sugar industry, predominantly grown in Punjab and Sindh. The crop supports numerous farming communities and contributes significantly to the country\'s industrial sector. Sugar cane is also used in the production of ethanol and other by-products, enhancing its economic value.',
      sections: [
        {title: 'Water Requirements', content: 'Sugar cane requires substantial water, with critical stages during germination and elongation. Efficient irrigation practices are crucial. Proper scheduling of irrigation and the use of efficient irrigation methods can help in optimizing water use.'},
        {title: 'Harvesting', content: 'Harvesting occurs from November to April. Manual cutting is common, though mechanical harvesting is increasing. Proper timing of harvest and post-harvest handling are essential to maintain sugar content and quality.'},
        {title: 'Seed', content: 'Sugar cane is propagated using setts (cuttings) from high-yielding varieties like CPF-237, HSF-240, and SPF-213. Proper treatment of setts before planting can help in reducing disease incidence and improving germination rates.'},
        {title: 'Disease', content: 'Red rot, smut, and mosaic virus are common diseases. Resistant varieties and proper field management practices are essential for control. Regular monitoring and timely intervention can help in managing these diseases effectively.'},
        {title: 'Crop Protection', content: 'Regular field monitoring, use of resistant varieties, and timely pesticide application are important for crop protection. Integrated pest management practices, including the use of biological controls, can help in reducing reliance on chemical pesticides.'},
        {title: 'Drip Irrigation', content: 'Drip irrigation systems are being introduced to enhance water use efficiency, especially in water-limited areas. This method helps in delivering water directly to the root zone, reducing water waste and improving crop productivity.'},
        {title: 'Planting', content: 'Planting is typically done from February to March and September to October, ensuring good sett placement and soil moisture. Proper land preparation and the use of high-quality setts are critical for achieving good crop establishment and growth.'},
      ],
    },
    {
      id: '5',
      name: 'Corn',
      description: 'Corn is an important crop in Pakistan for both food and feed, extensively cultivated after wheat and rice. It is grown in various regions, with Punjab being the leading producer. Corn is versatile, used in human consumption, animal feed, and as raw material for various industrial products.',
      sections: [
        {
          title: 'Water Requirements',
          content: 'High yielding corn requires approximately 22 to 30 inches of water per year depending on planting date, planting density, maturity group, location, and weather conditions. Corn requires the most water during the early reproductive growth stages, which are also the most sensitive stages to water stress. Substantial reductions in yield can occur if corn does not receive enough water to meet ET demands during this critical water use period. Efficient irrigation practices, such as drip and sprinkler irrigation, can help in optimizing water use and improving yield.'
        },
        {
          title: 'Harvesting',
          content: 'Corn is harvested from September to November. It should be promptly moved from the field to avoid post-harvest losses and maintain quality. Proper drying and storage techniques are crucial to prevent spoilage and maintain the nutritional value of the grain.'
        },
        {
          title: 'Seed',
          content: 'The major categories of corn are sweet corn, popcorn, and field corn, a group that includes dent, flint, and flour varieties. Recommended hybrids for Pakistan include Neelum, Sadaf, and Pak-Afgoi, which are suited to local conditions and resistant to common pests and diseases.'
        },
        {
          title: 'Disease',
          content: 'Common diseases include maize streak virus, rust, and leaf blight. Using disease-resistant varieties and crop rotation are effective management strategies. Regular field monitoring and timely application of fungicides can help in controlling these diseases.'
        },
        {
          title: 'Crop Protection',
          content: 'Effective crop protection involves IPM practices, including the use of chemical and biological controls to manage pests and diseases. Regular field scouting, use of resistant varieties, and maintaining field hygiene are essential components of a successful IPM strategy.'
        },
        {
          title: 'Drip Irrigation',
          content: 'Drip irrigation in corn can significantly enhance water use efficiency and nutrient uptake, especially in areas with limited water resources. This method delivers water directly to the root zone, reducing water waste and improving crop yields.'
        },
        {
          title: 'Planting',
          content: 'Corn should be planted from February to March (spring crop) and July to August (autumn crop) in well-prepared soil with proper spacing. The use of high-quality seeds and proper seedbed preparation are critical for achieving good germination and plant growth.'
        },
      ],
    },
  ];
  
  export default cropsData;
  