import { Button, Card, Table } from "@/design-system/components";
import styles from "./pattern.module.css";
import cardStyles from "@/design-system/components/card/card.module.css";

export function DetailPattern() {
  return (
    <section className={styles.pattern}>
      <div>
        <p className={styles.subtitle}>Home / API 상품 / 테마상품</p>
        <h2 className={styles.title}>Detail</h2>
        <p className={styles.subtitle}>기업관계망서비스</p>
      </div>
      <div className={styles.detailLayout}>
        <div className={styles.section}>
          <Card shadow="1" radius="8" padding="l">
            <Card.Header>
              <h3 className={cardStyles.title}>개요</h3>
            </Card.Header>
            <Card.Body>
              <p className={styles.subtitle}>
                기업의 관계망 정보를 제공하여 리스크 분석과 영업 타겟팅에
                활용할 수 있습니다.
              </p>
            </Card.Body>
          </Card>
          <Card shadow="1" radius="8" padding="m">
            <Card.Header>
              <h3 className={cardStyles.title}>제공정보</h3>
            </Card.Header>
            <Card.Body>
              <Table density="comfortable">
                <Table.Scroll>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>상품구성</Table.Head>
                      <Table.Head>상세정보</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>기업프로필</Table.Cell>
                      <Table.Cell>기본 기업 정보</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>신용등급</Table.Cell>
                      <Table.Cell>신용평가 등급</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>휴폐업정보</Table.Cell>
                      <Table.Cell>영업 상태</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Scroll>
              </Table>
            </Card.Body>
          </Card>
          <div className={styles.actions} style={{ justifyContent: "center" }}>
            <Button variant="ghost" size="m">
              목록
            </Button>
          </div>
        </div>
        <Card shadow="2" radius="8" padding="m">
          <Card.Header>
            <h3 className={cardStyles.title}>바로신청</h3>
          </Card.Header>
          <Card.Body>
            <p className={styles.subtitle}>관심상품으로 저장 후 신청할 수 있습니다.</p>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" size="s" width="fill">
              관심상품
            </Button>
            <Button variant="primary" size="s" width="fill">
              바로신청
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </section>
  );
}
