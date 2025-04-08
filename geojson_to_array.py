import json

def extract_station_names(geojson_path, output_path):
    """
    Ekstrahuje nazwy stacji z pliku GeoJSON i zapisuje je jako listę w pliku JSON.
    
    Args:
        geojson_path (str): Ścieżka do pliku GeoJSON
        output_path (str): Ścieżka do pliku wyjściowego JSON
    """
    try:
        # Otwórz plik GeoJSON
        with open(geojson_path, 'r', encoding='utf-8') as file:
            geojson_data = json.load(file)
        
        # Ekstrahuj nazwy stacji
        station_names = []
        for feature in geojson_data.get('features', []):
            properties = feature.get('properties', {})
            name = properties.get('name')
            if name:
                station_names.append(name)
        
        # Zapisz nazwy jako JSON
        with open(output_path, 'w', encoding='utf-8') as output_file:
            json.dump(station_names, output_file, ensure_ascii=False, indent=4)
        
        print(f"Zapisano {len(station_names)} nazw stacji do pliku {output_path}")
        
    except Exception as e:
        print(f"Wystąpił błąd: {e}")

# Ścieżki plików - zmień według potrzeb
input_file = "stacje_kolejowe.geojson"
output_file = "nazwy_stacji.json"

# Uruchom funkcję
if __name__ == "__main__":
    extract_station_names(input_file, output_file)