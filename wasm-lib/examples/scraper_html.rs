fn main() {
    let html = r#"
    <div id="div-root">
    <canvas id="canvas-content" style="height: 500px; width: 500px;"></canvas>
    </div>
    "#;

    let document = scraper::Html::parse_document(html);
    let selector = scraper::Selector::parse("div").unwrap();
    let x: Vec<scraper::ElementRef> = document.select(&selector).map(|ele| ele).collect();
    println!("{:#?}", x);
}
