# Gruppuppgift

**Tid: 2h 0min**

I denna uppgift ska ni tillsammans skapa ett litet Node.js-script som läser och skriver asynkrona filer. Istället för en vanlig textfil ska ni använda **CSV** eller **JSON**-data. Ni får själva välja **en** av de tre metoderna ni har lärt er (callbacks, promises eller async/await). Diskutera slutligen hur det fungerade och hur metoden ni valde jämförs med de andra rent teoretiskt.

---

## Uppgiftens steg

1. **Projektuppsättning**
    - Skapa en ny mapp för projektet och initiera npm med `npm init -y`.
    - Inga externa paket behövs om ni använder Node.js inbyggda `fs` eller `fs/promises`.
    - Om ni vill göra mer avancerad hantering av CSV eller JSON, kan ni överväga att installera ett lämpligt bibliotek, men det är inte ett krav.
2. **Använd CSV eller JSON**
    - Välj **antingen** en **CSV**fil (exempel: `data.csv`) **eller** en **JSON**fil (exempel: `data.json`).
    - Lägg in några rader data (till exempel en lista över användare eller produkter) i ert filformat.
3. **Läs data**
    - Läs in filen (CSV eller JSON) med er valda asynkrona metod (callback, promise eller async/await) och skriv ut innehållet i konsolen.
    - *Tips för JSON:* Använd `JSON.parse` för att omvandla textinnehållet till JavaScript-objekt.
    - *Tips för CSV:* Ni kan splitta data på radbrytningar och kommatecken för en enkel lösning, eller använda ett bibliotek om ni vill.
4. **Bearbeta data**
    - Gör någon enkel bearbetning av den inlästa datan. Exempel:
        - Lägg till ett nytt fält i varje objekt (för JSON).
        - Filtrera bort vissa rader (för CSV).
        - Konvertera alla strängar till versaler eller ändra siffror på något vis.
5. **Skriv tillbaka data**
    - Skriv tillbaka det bearbetade resultatet till en ny fil (exempelvis `result.csv` eller `result.json`).
    - Bekräfta i konsolen när skrivningen är klar eller om ett fel uppstod.

---

## Script

```bash
node parse_csv.js --file=data/email.csv --action=print
node parse_csv.js --file=data/email.csv --action=json
node parse_csv.js --file=data/email.csv --action=append --data="123;email@test.com;Jane;Doe"
node parse_csv.js --file=data/email.csv --action=remove --id=123

node parse_json.js --file=data/users.json --action=print
node parse_json.js --file=data/users.json --action=append --data="{\"id\": 123, \"email\": \"email@test.com\", \"first_name\": \"Jane\", \"last_name\": \"Doe\"}"
node parse_json.js --file=data/users.json --action=remove --id=123
```

