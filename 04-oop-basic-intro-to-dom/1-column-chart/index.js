export default class ColumnChart {
    chartHeight = 50;
    element;

    constructor(props = {}) {
        const { data = [], label = '', link = '', value = 0, formatHeading = (value) => value } = props;
        this.data = this.getDataProps(data);
        this.label = label;
        this.link = link;
        this.value = formatHeading(value);
        this.formatHeading = formatHeading;
        this.element = this.createElement();
    }

    getDataProps(data) {
        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;

        return data.map(item => {
            return {
                percent: (item / maxValue * 100).toFixed(0) + '%',
                value: String(Math.floor(item * scale))
            };
        });
    }

    createLink = (link) => `<a href="${link}" class="column-chart__link">View all</a>`

    createDataList = (data) => data.map(({ value, percent }) =>
        `<div style="--value: ${value}" data-tooltip="${percent}"></div>`).join("");

    createTitle = (label, link) => `
        <div class="column-chart__title">
            Total ${label}
            ${this.createLink(link)}
        </div>
    `

    createTemplate() {
        const isLoading = this.data.length > 0;
        const template = `
            <div class="column-chart ${isLoading ? '' : 'column-chart_loading'}" style="--chart-height: ${this.chartHeight}">
                ${this.createTitle(this.label, this.link)}
                <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.value}</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.createDataList(this.data)}
                </div>
            </div>
        `;

        return template;
    }

    createElement() {
        const element = document.createElement("div",);
        element.innerHTML = this.createTemplate();
        return element.firstElementChild;
    }

    update(data) {
        this.data = this.getDataProps(data);
        this.render();
    }

    render() {
        if(this.element?.parentElement){
            this.element.parentElement.innerHTML = this.createTemplate();
        }
    }

    destroy() {
        this.remove();
    }

    remove() {
        this.element.remove();
    }
}
