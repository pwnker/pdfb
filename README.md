# PDFB

A pdf building library for nodejs hehe.

---

!! DOCUMENTATION IN PROGRESS !!

---

## TODO
  * [ ] Save path setters / getters
  ```typescript
  setSavePath(path: string): string;
  getSavePath(): string;
  ``` 

---

## DONE

* [x] PdfBuilder 
  * [x] save document
  ```typescript
      save(options?: {
        render: true,
        savePath: ''
      })
  ```

* [x] ```Section.class``` calculate **start**, **end**, **size** based of the elements inside
  * basically a way of creating a wrapper (background) that covers all elements of a section

* [x] ```Page```
  * Stores individual page data
  * ```Section[]```
  * ```PdfBuilder.class``` stores a page array ```Page[]```

* [x] Fix padding handling inside ```PdfBuilder```
  * Padding should affect the document start/end positions
