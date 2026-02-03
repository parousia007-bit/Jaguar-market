import json

with open('marketplace_data.json', 'r') as f:
    data = json.load(f)

# Update Tavolos products with placeholder images
for vendor in data['vendors']:
    if vendor['id'] == 'tavolos':
        for category in vendor['categories']:
            for product in category['products']:
                # Assign a generic pizza/pasta image based on category id if possible
                cat_id = category['id']
                if cat_id == 'pizzas':
                    product['image'] = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60"
                elif cat_id == 'pastas':
                    product['image'] = "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&auto=format&fit=crop&q=60"
                elif cat_id == 'alitas':
                    product['image'] = "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&auto=format&fit=crop&q=60"
                elif cat_id == 'bebidas':
                    product['image'] = "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60"
                elif cat_id == 'platillos':
                    product['image'] = "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60"
                else:
                    product['image'] = "https://placehold.co/400x300"

with open('marketplace_data.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
